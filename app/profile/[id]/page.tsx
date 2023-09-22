import { UserProfile } from "@/common.types";
import ProfilePage from "@/components/ProfilePage";
import { fetchUserProjects } from "@/lib/action";
import React from "react";
type Props = {
  params: {
    id: string;
  };
};
const userProfile = async({ params: { id } }: Props) => {
    const userProject = await fetchUserProjects(id,100)  as {user:UserProfile};
    if(!userProject?.user){
        return<p className="no-result-text">Profile Not Found</p>
    }
  return <ProfilePage user={userProject?.user}/>;
};

export default userProfile;
