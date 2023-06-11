import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  options: { label: string; value: any }[];
  label: string;
  placeholder?: string;
  defaultValue: string | string[] | number;
  multiple?: boolean;
  disabled: boolean;
  required: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

const SelectInput: React.FC<Props> = ({
  id,
  options,
  label,
  placeholder,
  defaultValue,
  multiple,
  disabled,
  required,
  errors,
  register,
}) => {
  return (
    <div>
      <label
        className={`
            ${errors[id] ? "text-rose-500" : "text-blue-800"}
      `}
      >
        {label}
      </label>
      <select
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        defaultValue={defaultValue}
        multiple={multiple}
        placeholder={placeholder}
        className={`
        peer
        w-full
        p-2
        font-light
        text-black
        bg-white
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}

        `}
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
