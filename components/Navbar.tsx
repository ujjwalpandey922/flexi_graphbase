import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
const Navbar = () => {
  const system = {};
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-12">
        <Link href={"/"}>
          <Image src={logo} alt={"logo"} height={35} width={115} />
        </Link>
        <ul className="xl:flex hidden gap-8 text-small ">
          {NavLinks.map((link) => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {system ? (
          <>
            User Photo
            <Link href={"/createPage"}>BUTTON</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
