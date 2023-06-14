import Button from "@/components/utilities/button/Button";
import Input from "@/components/utilities/input/Input";
import React from "react";
import {
  UseFormRegister,
  Control,
  FieldValues,
  useFieldArray,
  FieldErrors,
} from "react-hook-form";

interface Props {
  index: number;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  errors: FieldErrors;
}

function SeriesUpdateNestedField({ control, index, register, errors }: Props) {
  const {
    fields: episodefields,
    remove: episodesremove,
    append: episodesappend,
  } = useFieldArray({
    name: `seasons.${index}.episodes`,
    control,
  });

  return (
    <div className="flex flex-col gap-3 bg-blue-200 p-2">
      {episodefields.map((episodefield, fieldindex) => (
        <section key={episodefield.id} className="flex flex-col gap-3">
          <div className="flex flex-col min-[450px]:flex-row gap-2">
            <Input
              id={`seasons.${index}.episodes.${fieldindex}.episodeName`}
              label={"Episode Name"}
              disabled={false}
              required={true}
              complexError={
                //@ts-ignore
                errors?.seasons?.[index]?.episodes?.[fieldindex]?.episodeName
                  ? true
                  : false
              }
              errors={errors}
              register={register}
            />

            <Input
              id={`seasons.${index}.episodes.${fieldindex}.downloadLink`}
              label={"Episode Download Link"}
              disabled={false}
              required={true}
              complexError={
                //@ts-ignore
                errors?.seasons?.[index]?.episodes?.[fieldindex]?.downloadLink
                  ? true
                  : false
              }
              errors={errors}
              register={register}
            />
          </div>

          <div>
            <Button
              isSmall
              onClick={(e) => {
                e.preventDefault();
                episodesremove(fieldindex);
              }}
            >
              remove episode
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
            episodesappend({ episodeName: "", downloadLink: "" });
          }}
        >
          add episodes
        </Button>
      </div>
    </div>
  );
}

export default SeriesUpdateNestedField;
