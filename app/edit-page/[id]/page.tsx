import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { fetchProjectDetails } from "@/lib/action";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const EditProject = async ({params:{id}}:{params:{id:string}}) => {
  const session = await getCurrentUser();
  if (!session) redirect("/");
  const result = (await fetchProjectDetails(id)) as {
    project?: ProjectInterface;
  };
  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type={"edit"} session={session} details={result.project} />
    </Modal>
  );
};

export default EditProject;
