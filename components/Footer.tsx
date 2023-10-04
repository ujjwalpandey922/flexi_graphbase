import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type footerTypes = {
  title: string;
  links: Array<string>;
};

const FooterCol = ({ title, links }: footerTypes) => {
  return (
    <div className="footer_column">
      <h4 className="font-bold text-xl">{title}</h4>
      <ul className="flex flex-col gap-2 font-normal">
        {links.map((link) => (
          <Link href="/" key={link}>
            {link}
          </Link>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="flexStart footer text-light-white-100">
      <div className="flex flex-col gap-16 w-full">
        <div className="flex items-start flex-col ">
          <Image
            src={"/logo-purple.svg"}
            height={40}
            width={120}
            alt="flexible"
          />
          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Flexibble is the world&apos;s leading community for creatives to
            share, grow, and get hired.
          </p>
        </div>
        <div className="flex flex-wrap gap-16 ">
          <FooterCol
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />

          <div className="flex-1 flex flex-col gap-4">
            <FooterCol
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterCol
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>
          <FooterCol
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />

          <div className="flex-1 flex flex-col gap-4">
            <FooterCol
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterCol
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>

          <FooterCol
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
        </div>{" "}
      </div>
      <div className="flexBetween footer_copyright">
        {" "}
        <p>@ 2023 Flexibble. All rights reserved</p>{" "}
        <p className="text-light-white-500 flex gap-2 items-center">
          <span className="text-white font-semibold">10,214</span> projects
          submitted
        </p>
      </div>
    </footer>
  );
};

export default Footer;
