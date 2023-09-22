import Image from "next/image";
import React, { MouseEventHandler } from "react";
type Props = {
  title: string;
  type: "button" | "submit";
  LeftIcon?: null | string;
  RightIcon?: null | string;
  isSubmitting?: boolean;
  handleClick?: MouseEventHandler;
  bgColor?: string;
  textColor?: string;
};
const Button = ({
  title,
  type,
  LeftIcon,
  isSubmitting,
  RightIcon,
  handleClick,
  bgColor,
  textColor,
}: Props) => {
  return (
    <button
      className={`flexCenter gap-3 px-4 py-3 rounded-lg   
       ${textColor || "text-white"} 
        ${isSubmitting ? "bg-black/50" : bgColor || "bg-primary-purple"}`}
      type={type || "button"}
      disabled={isSubmitting}
      onClick={handleClick}
    >
      {LeftIcon && <Image alt="left" src={LeftIcon} height={15} width={15} />}
      {title}
      {RightIcon && (
        <Image alt="right" src={RightIcon} height={15} width={15} />
      )}
    </button>
  );
};

export default Button;
