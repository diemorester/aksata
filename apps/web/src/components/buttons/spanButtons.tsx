"use client"

import clsx from "clsx";
import React from "react";

interface ButtonSpanProps {
  children?: React.ReactNode;
  text1?: string;
  text2?: string;
  disabled?: boolean;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  danger?: boolean;
  outline?: boolean;
  fill?: "bg-neutral-300" | "bg-neutral-700" | "bg-red-500" | "bg-green-500" | "bg-black";
  rounded?: "lg" | "xl" | "2xl" | "3xl";
  aksata?: boolean;
  ristoan?: boolean;
  hayan?: boolean;
  sirius?: boolean;
  fullWidth?: boolean;
  classname?: string;
}

const ButtonSpan: React.FC<ButtonSpanProps> = ({
  children,
  text1,
  text2,
  disabled,
  type,
  onClick,
  danger,
  outline,
  fill,
  rounded,
  aksata,
  ristoan,
  hayan,
  sirius,
  fullWidth,
  classname
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `group relative min-h-[35px] transition-transform duration-300 ease-in-out hover:border-none disabled:opacity-55 rounded-${rounded || "3xl"}`,
        classname,
        children && "",
        !disabled && "active:scale-95",
        // Edit outline
        outline && children && !text1 && !text2 && "px-2 ring-1 ring-green-400",

        fullWidth ? 'w-full' : 'w-fit',

        // Edit fill
        fill == "bg-neutral-300" && children && !outline && !text1 && !text2 && "bg-neutral-300 text-black hover:bg-neutral-100 px-4 py-2",

        fill == "bg-red-500" && children && !outline && !text1 && !text2 && "bg-red-500 text-neutral-100 hover:bg-red-400 px-4 py-2",

        fill == "bg-neutral-700" && children && !outline && !text1 && !text2 && "bg-neutral-700 text-neutral-300 px-4 py-2 text-sm hover:bg-neutral-600",
        
        fill == "bg-black" && children && !outline && !text1 && !text2 && "bg-black text-neutral-300 rounded-lg px-4 py-2 text-sm hover:bg-neutral-700",

        fill == "bg-green-500" && children && !outline && !text1 && !text2 && "bg-green-500 text-neutral-100 px-6 py-3 rounded-md hover:bg-green-600 hover:text-neutral-50",

        text1 && text2 && !children && "min-w-[85px] overflow-hidden"
      )}
    >
      {text1 && text2 && !children && (
        <>
          <span
            className={clsx(
              "absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out",
              aksata && 'bg-black text-white rounded-lg',
              ristoan && 'bg-neutral-300 text-black',
              disabled
                ? "group-hover:translate-x-0 "
                : "group-hover:translate-x-full group-active:scale-95",
            )}
          >
            {text1}
          </span>
          <span
            className={clsx(
              "absolute inset-0 flex -translate-x-full items-center justify-center transition-transform duration-300 ease-in-out",
              disabled
                ? "group-hover:-translate-x-full"
                : "group-hover:translate-x-0 group-active:scale-95",
              danger
                ? "group-hover:bg-red-600 group-hover:text-white"
                : "group-hover:bg-green-400 group-hover:text-black",
            )}
          >
            {text2}
          </span>
        </>
      )}
      {children}
      {children && !disabled && !outline && !fill && (
        <span className={clsx(`absolute bottom-1 left-1/2 h-[1px] w-0 transition-all duration-150 group-hover:left-0 group-hover:w-full`,
          aksata && 'bg-black',
          ristoan && 'bg-neutral-100'
        )} />
      )}
    </button>
  );
};

export default ButtonSpan;