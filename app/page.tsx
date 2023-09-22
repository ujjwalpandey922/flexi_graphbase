import { ProjectInterface } from "@/common.types";
import Category from "@/components/Category";
import More from "@/components/More";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects, fetchAllProjectsCategory } from "@/lib/action";
type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string ;
      endCursor: string ;
    };
  };
};
type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
};

type Props = {
  searchParams: SearchParams;
};
//Force Dynamic Reload
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  let data;
  if (!category && !endcursor) {
    data = (await fetchAllProjects()) as ProjectSearch;
  } else if (endcursor || category) {
    data = (await fetchAllProjectsCategory(
      category,
      endcursor
    )) as ProjectSearch;
  }

  const actualData = data?.projectSearch?.edges || [];
  console.log(data, actualData);
  if (actualData.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Category />
        <p className=" no-result-text">
          No Projects Found Go MAKE SOME FIRST.....!!!!!!!
        </p>
      </section>
    );
  }
  const pagination = data?.projectSearch?.pageInfo ;
  return (
    <section className="flexStart flex-col mb-16 paddings">
      <Category />
      <section className="projects-grid">
        {actualData.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))}
      </section>
      <More
        startCursor={pagination?.startCursor}
        endCursor={pagination?.endCursor}
        hasNextPage={pagination?.hasNextPage}
        hasPreviousPage={pagination?.hasPreviousPage}
      />
    </section>
  );
};

export default Home;
