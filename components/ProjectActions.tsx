"use client";
import { deleteUserProjects, fetchToken } from "@/lib/action";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProjectActions = ({ projectId }: { projectId: string }) => {
  const [isDeleting, setisDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setisDeleting(true);
    const { token } = await fetchToken();
    try {
      const res = await deleteUserProjects(projectId, token);
      console.log(res);
      if (res) {
        router.push("/");
      } else {
        console.error("cannot Delete Project TRY AGAIN");
      }
    } catch (error) {
      throw error;
    } finally {
      setisDeleting(false);
    }
  };
  return (
    <>
      <Link
        href={`/edit-page/${projectId}`}
        className="flexCenter edit-action_btn "
      >
        <Image alt="edit" width={20} height={20} src={"/pencile.svg"} />
      </Link>
      <button
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray-100" : "bg-primary-purple "
        }   `}
        onClick={handleDelete}
      >
        <Image alt="delete" width={20} height={20} src={"/trash.svg"} />
      </button>
    </>
  );
};

export default ProjectActions;
