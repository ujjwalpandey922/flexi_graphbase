"use client";
import { SessionInterface } from "@/common.types";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import FormField from "./FormField";
import CustomInput from "./CustomInput";
import { categoryFilters } from "@/constants";
import Button from "./Button";
import { createProject, fetchToken } from "@/lib/action";
import { useRouter } from "next/navigation";
type props = {
  type: string;
  session: SessionInterface;
};
const ProjectForm = ({ type, session }: props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  });
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "create") {        
        await createProject(form, session?.user?.id, token);
        router.push("/");
      }
    } catch (error) {
      console.log("==============PROJEC FORM ERROR==========");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  // HOW TO UPLOAD TO CLOUDINARY..........(store in the usestate First then to the cloud)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // this is how we get the selected file by user
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image"))
      return alert("Only Image Files Are Allowed");
    // Lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    const reader = new FileReader();
    // read Data As URL LOL...
    reader.readAsDataURL(file);
    //The load event is fired when a file has been read successfully.
    reader.onload = () => {
      const result = reader.result as string;
      setInputChange("image", result);
    };
  };
  const setInputChange = (fieldName: string, value: string) => {
    // change the object value without disturbing other stuff.
    setForm((pre) => ({ ...pre, [fieldName]: value }));
  };
  return (
    <form onSubmit={handleSubmit} className=" form flex flex-col gap-4 my-8">
      <div className="flexStart form_image-container">
        {!form.image ? (
          <label className="flexCenter form_image-label">
            UPLOAD Image for project
            <input
              type="file"
              id="image"
              accept="image/*"
              required={type === "create"}
              className="form_image-input"
              onChange={handleImageUpload}
            />
          </label>
        ) : (
          <Image
            src={form.image}
            className="object-contain z-20 sm:p-10"
            fill
            alt="Project Thumbnail"
          />
        )}
      </div>

      <FormField
        label="Project Title"
        type="text"
        value={form.title}
        onChange={(value) => setInputChange("title", value)}
        placeholder="Enter Project Title"
      />
      <FormField
        label="Description"
        value={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        textarea
        onChange={(value) => setInputChange("description", value)}
      />

      <FormField
        type="url"
        label="Website URL"
        value={form.liveSiteUrl}
        placeholder="https://jsmastery.pro"
        onChange={(value) => setInputChange("liveSiteUrl", value)}
      />

      <FormField
        type="url"
        label="GitHub URL"
        value={form.githubUrl}
        placeholder="https://github.com/adrianhajdin"
        onChange={(value) => setInputChange("githubUrl", value)}
      />
      <CustomInput
        label="Custom Input"
        value={form.category}
        filter={categoryFilters}
        onChange={(value) => setInputChange("category", value)}
      />

      <div className="w-full py-2">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          LeftIcon={isSubmitting ? "" : `/plus.svg`}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
