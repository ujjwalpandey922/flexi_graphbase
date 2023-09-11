import { Menu } from "@headlessui/react";
import Image from "next/image";
import React from "react";
type Props = {
  label: string;
  value: string;
  filter: Array<string>;
  onChange: (value: string) => void;
};
const CustomInput = ({ label, onChange, filter, value }: Props) => {
  return (
    <div className="flexStart w-full flex-col gap-4">
      <label className="text-gray-100 w-full">{label}</label>
      <Menu as="div" className={"self-start relative"}>
        <Menu.Button className="flexCenter gap-4 custom_menu-btn">
          {value || "Select A Category"}
          <Image
            height={20}
            width={15}
            alt="down arrow"
            src={"/arrow-down.svg"}
          />
        </Menu.Button>

        <Menu.Items className={"flexStart custom_menu-items"}>
          {filter.map((tag) => (
            <Menu.Item key={tag}>
              <button
                type="button"
                className="custom_menu-item"
                onClick={(e) => onChange(e.currentTarget.value)}
                value={tag}
              >
                {tag}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CustomInput;
