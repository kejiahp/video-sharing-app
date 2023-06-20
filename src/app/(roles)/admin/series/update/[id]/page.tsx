"use client";
import SeriesUpdateNestedField from "@/components/admin/series/SeriesUpdateNestedField";
import Loader from "@/components/loader/Loader";
import Button from "@/components/utilities/button/Button";
import Input from "@/components/utilities/input/Input";
import fetcher from "@/libs/fetcher";
import { ISeries } from "@/models/Series.model";
import {
  UpdateSeriesValidatorType,
  updateseriesvalidator,
} from "@/schema/series.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FieldValues,
  useForm,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWR, { mutate } from "swr";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { data, isLoading, error } = useSWR<ISeries & { _id: string }>(
    `/api/series/${params?.id}`,
    fetcher
  );
  const {
    handleSubmit,
    register,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues | UpdateSeriesValidatorType>({
    resolver: zodResolver(updateseriesvalidator),
    defaultValues: {
      seasons: [
        {
          seasonName: "",
          episodes: [
            {
              episodeName: "",
              downloadLink: "",
            },
          ],
        },
      ],
    },
  });

  const { fields, remove, append } = useFieldArray({
    name: "seasons",
    control,
  });

  useEffect(() => {
    if (data) {
      const mainData = {
        seasons: data.seasons,
      };
      reset(mainData);
    }
  }, [data, reset]);

  const onSubmitHandler: SubmitHandler<
    FieldValues | UpdateSeriesValidatorType
  > = (inputData) => {
    setIsUpdating(true);

    axios
      .patch(`/api/series/${params?.id}`, inputData)
      .then(() => {
        toast.success("series updated");
        mutate(`/api/series/${params?.id}`);
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  if (error) {
    throw new Error("can't fetch single series");
  }

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  return (
    <>
      <form className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <section
            key={field.id}
            className="flex flex-col gap-3 bg-gray-200 my-2 p-2"
          >
            <h1 className="text-center text-xl my-1 font-semibold">
              {watch(`seasons.${index}.seasonName`)}
            </h1>
            <Input
              id={`seasons.${index}.seasonName`}
              label={"Season Name"}
              disabled={false}
              required={true}
              //@ts-ignore
              complexError={errors?.seasons?.[index]?.seasonName ? true : false}
              errors={errors}
              register={register}
            />

            <SeriesUpdateNestedField
              errors={errors}
              control={control}
              register={register}
              index={index}
            />

            <div>
              <Button
                isSmall
                onClick={(e) => {
                  e.preventDefault();
                  remove(index);
                }}
              >
                remove season
              </Button>
            </div>
          </section>
        ))}
        <div className="flex justify-center item-center">
          <Button
            sec
            isSmall
            onClick={(e) => {
              e.preventDefault();
              append({ seasonName: "", episodes: [] });
            }}
          >
            add season
          </Button>
        </div>

        <div>
          <Button
            onClick={handleSubmit(onSubmitHandler)}
            sec
            disable={isUpdating}
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
