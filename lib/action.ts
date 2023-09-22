import { ProjectForm } from "@/common.types";
import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQuery,
  projectsQueryCategory,
  updateProjectMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV || "production";
// after production set api URL
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAPHBASE_URL || ""
  : "http://localhost:127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAPHBASE_KEY || ""
  : "anything";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";
// make a client using graph base
const client = new GraphQLClient(apiUrl);
export const fetchToken = async () => {
  try {
    // default way to get a token in next
    const res = await fetch(`/api/auth/token`);
    return res.json();
  } catch (error) {
    throw error;
  }
};
const makeGraphQlRequest = async (query: string, variable = {}) => {
  try {
    // client request IE Connection to the data base
    return await client.request(query, variable);
  } catch (error) {
    console.log("==========ACTION=============");
    console.log(error);
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQlRequest(getUserQuery, { email });
};
export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };
  return makeGraphQlRequest(createUserMutation, variables);
};

const uploadImg = async (imagePath: string) => {
  try {
    // call backend point like we gen do no change from react
    // to make this url in the folder structure make folder under app/api/upload
    const res = await fetch(`/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};
export const createProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  try {
    const ImageUrl = await uploadImg(form.image);
    if (ImageUrl && ImageUrl.url) {
      // checks the logged in user
      client.setHeader("Authorization", `Bearer ${token}`);
      client.setHeader("x-api-key", apiKey);

      const variables = {
        input: {
          ...form,
          image: ImageUrl.url,
          createdBy: {
            link: creatorId,
          },
        },
      };
      return makeGraphQlRequest(createProjectMutation, variables);
    } else {
      throw new Error("Image upload failed.");
    }
  } catch (error) {
    console.error("ERROR IN MAKING PROJECT", error);
    throw error;
  }
};

export const fetchAllProjects = (
  category?: string | null,
  endcursor?: string |null
) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQlRequest(projectsQuery, { category, endcursor });
};
export const fetchAllProjectsCategory = (
  category?: string | null,
  endcursor?: string | null
) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQlRequest(projectsQueryCategory, { category, endcursor });
};
export const fetchProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQlRequest(getProjectByIdQuery, { id });
};
export const fetchUserProjects = (id: string,last?:number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQlRequest(getProjectsOfUserQuery, { id,last });
};
export const deleteUserProjects = (id: string,token:string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  client.setHeader("x-api-key", apiKey);
  return makeGraphQlRequest(deleteProjectMutation, { id });
};
export const editProject = async(form: ProjectForm, projectId: string, token: string) => {
  //check if the image is changed or not 
   function isBase64DataURL(value: string) {
     const base64Regex = /^data:image\/[a-z]+;base64,/;
     return base64Regex.test(value);
   }
   //if changed then 
   const isUploadingImage = isBase64DataURL(form.image);
   //updated form
   let updatedForm = {...form};
   if(isUploadingImage){
      const newImageUrl = await uploadImg(form.image);
       if (newImageUrl.url) {
         updatedForm = { ...updatedForm, image: newImageUrl.url };
       }
   }

  client.setHeader("Authorization", `Bearer ${token}`);
  client.setHeader("x-api-key", apiKey);

  const variables = {
    id: projectId,
    input: updatedForm,
  };
  return makeGraphQlRequest(updateProjectMutation, variables);
};
