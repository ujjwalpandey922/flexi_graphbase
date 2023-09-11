import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/action";
type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: boolean;
      endCursor: boolean;
    };
  };
};
const Home = async () => {
  const data = (await fetchAllProjects()) as ProjectSearch;
  console.log("PROJEtCS", data);

  const actualData = data?.projectSearch.edges || [];
  if (actualData.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className=" no-result-text">
          No Projects Found Go MAKE SOME FIRST.....!!!!!!!
        </p>
      </section>
    );
  }

  return (
    <section className="flexStart flex-col mb-16 paddings">
      <h1>Cat</h1>
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
      <h1>MORe</h1>
    </section>
  );
};

export default Home;
