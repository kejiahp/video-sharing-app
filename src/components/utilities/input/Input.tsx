"use client";
import React from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled: boolean;
  required: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  icon?: JSX.Element;
  isIcon: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  errors,
  isIcon,
  register,
  icon,
}) => {
  return (
    <div className="w-full relative">
      {isIcon && <>{icon}</>}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
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
            text-sm
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

export default Input;
