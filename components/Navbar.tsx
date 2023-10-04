import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo-purple.svg";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";
//top level await in next js as it is server side rendering
const Navbar = async () => {
  const session = await getCurrentUser();
  // console.log("=========SYSTEM================");
  // console.log(session);
  return (
    <nav className="flexBetween navbar bg-[#132043]">
      <div className="flex-1 flexStart gap-12">
        <Link href={"/"}>
          <Image src={logo} alt={"logo"} height={35} width={115} />
        </Link>
        <ul className="xl:flex hidden gap-8 text-xl ">
          {NavLinks.map((link) => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href={"/createProject"}>Create Project</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
