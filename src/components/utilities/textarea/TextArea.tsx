"use client";
import React from "react";

import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  disabled: boolean;
  required: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  icon?: JSX.Element;
  isIcon?: boolean;
  cols?: number;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  disabled,
  required,
  cols,
  rows,
  errors,
  isIcon,
  register,
  icon,
}) => {
  return (
    <div className="w-full relative">
      {isIcon && <>{icon}</>}
      <textarea
        rows={rows}
        cols={cols}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`
        peer
        w-full
        p-4
        font-light
        text-black
        bg-white
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${isIcon ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}

        `}
      />
      <label
        className={`
            absolute
            sm:text-sm
            sm:font-normal
            text-xs
            font-semibold
            transform
            duration-150
            -translate-y-4
            top-5
            z-10
            origin-[0]
            ${isIcon ? "left-9" : "left-4"}
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-5
            ${errors[id] ? "text-rose-500" : "text-blue-800"}
            `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
