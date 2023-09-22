import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import { fetchProjectDetails } from "@/lib/action";
import Modal from "@/components/Modal";
// import ProjectActions from "@/components/ProjectActions";
import RelatedProjects from "@/components/RelatedProjects";
import { ProjectInterface } from "@/common.types";
import ProjectActions from "@/components/ProjectActions";

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await fetchProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  if (!result?.project)
    return <p className="no-result-text">Failed to fetch project info</p>;

  const projectDetails = result?.project;

  const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`;

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={projectDetails?.createdBy?.avatarUrl}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {projectDetails?.title}
            </p>
            <div className="user-info">
              <Link href={renderLink()}>{projectDetails?.createdBy?.name}</Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${projectDetails.category}`}
                className="text-primary-purple font-semibold"
              >
                {projectDetails?.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === projectDetails?.createdBy?.email && (
          <div className="flex justify-end items-center gap-2">
            <ProjectActions  projectId={projectDetails?.id} />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Image
          src={`${projectDetails?.image}`}
          className="object-cover rounded-2xl"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">
          {projectDetails?.description}
        </p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Link
            href={projectDetails?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            👩‍💻 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={projectDetails?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
          <Image
            src={projectDetails?.createdBy?.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects
        userId={projectDetails?.createdBy?.id}
        projectId={projectDetails?.id}
      />
    </Modal>
  );
};

export default Project;

    // one way to do it
    // <div className="bg-black-100 bg-opacity-75  absolute inset-0 text-light-white flex">
    //   <div className="cross text-light-white-100  absolute font-bold text-4xl top-4 right-8 cursor-pointer hover:text-black transition-all">
    //     X
    //   </div>
    //   <div className="w-full max-h-[88%] mt-auto  bg-slate-100 rounded-t-3xl scroll-auto overflow-scroll ">
    //     <div className="container text-black m-auto p-8 bg-teal-50 flex flex-col gap-8 ">
    //       <header className="flex gap-4">
    //         <p className="flex justify-center items-center">
    //           <Image
    //             src={project?.createdBy.avatarUrl}
    //             alt="Logo"
    //             width={40}
    //             height={20}
    //             className="rounded-full"
    //           />
    //         </p>
    //         <p className="flex flex-col gap-2">
    //           <span className="font-bold text-2xl text-black">
    //             {project?.createdBy.name}
    //           </span>
    //           <span className="font-normal text-xl text-gray">
    //             {project?.createdBy.email}
    //           </span>
    //         </p>
    //       </header>
    //       <main className="flex flex-col justify-center items-center gap-12">
    //         <section className="flex">
    //           <Image
    //             src={project?.image}
    //             alt="Logo"
    //             width={400}
    //             height={400}
    //             className=" rounded-xl object-contain"
    //           />
    //         </section>
    //         <div className="flex flex-col gap-4">
    //           <p className="text-xl font-semibold">{project?.description}</p>
    //           <p className="flex gap-4">
    //             <span>{project?.githubUrl}</span>
    //             <span>{project?.liveSiteUrl}</span>
    //           </p>
    //         </div>
    //         <div className="w-full relative flex justify-center">
    //           <div className="h-[1px] bg-gray-100 min-w-full absolute top-[50%] "></div>
    //           <Image
    //             src={project?.createdBy.avatarUrl}
    //             alt="Logo"
    //             width={40}
    //             height={20}
    //             className="rounded-full z-10"
    //           />
    //         </div>
    //       </main>
    //       <footer>
    //         <span className="font-bold text-2xl text-black">
    //           More By {project?.createdBy.name}
    //         </span>
    //       </footer>
    //     </div>
    //   </div>
    // </div>

