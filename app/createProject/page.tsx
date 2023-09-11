import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const CreateProject = async () => {
  const session = await getCurrentUser();
  if(!session) redirect("/");
  return <Modal>
    <h3 className="modal-head-text">Create A New Project</h3>
    <ProjectForm type={"create"} session={session}/>
  </Modal>;
};

export default CreateProject;
