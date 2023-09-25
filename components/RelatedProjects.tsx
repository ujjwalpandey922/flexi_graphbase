import { UserProfile, ProjectInterface } from "@/common.types";
import { fetchUserProjects } from "@/lib/action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type props = {
  userId: string;
  projectId: string;
};
const RelatedProjects = async ({ userId, projectId }: props) => {
  const result = (await fetchUserProjects(userId)) as { user?: UserProfile };
  const filteredProjects = result?.user?.projects?.edges?.filter(
    ({ node }: { node: ProjectInterface }) => node.id !== projectId
  );
  if (filteredProjects?.length==0) return null;
  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flex justify-between items-center">
        <p className="text-base font-bold">More By... {result?.user?.name}</p>
        <Link
          href={`/profile/${result?.user?.id}`}
          className="text-base text-primary-purple"
        >
          View All
        </Link>
      </div>
      <div className="related_projects-grid">
        {filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
          <div className="flexCenter related_project-card drop-shadow-card" key={node?.id}>
            <Link
              href={`/project/${node?.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={node?.image}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt="project image"
              />

              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{node?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
