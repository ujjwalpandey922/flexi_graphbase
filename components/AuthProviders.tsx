"use client";

import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};
type Providers = Record<string, Provider>;
const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);
  useEffect(() => {
    const fetchAuth =async ()=>{
      try {
          const res = await getProviders();
          console.log("======getProviders=============");
          console.log(res);
          setProviders(res);
      } catch (error) { 
        console.log(error);
        
      }
    }
    fetchAuth();
  }, []);
  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider) => (
          <button key={provider.id} onClick={() => signIn(provider?.id)}>
            {provider.id}
          </button>
        ))}
      </div>
    );
  }
};

export default AuthProviders;

//for creating a next auth 
// 1. Make a auth file inside api/auth/[...auth] folder called ROUTES_MANIFEST.js 
// 2. this will have the handlers for get and post method nextAuth(options)
// 3. this option contains providers,jwt,callbacks(Sign In / log Out)