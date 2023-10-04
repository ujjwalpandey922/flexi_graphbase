"use client"
import React from 'react'
import Button from './Button';
import { useRouter } from 'next/navigation';
type Props = {
  startCursor: string | undefined;
  endCursor: string | undefined;
  hasNextPage: boolean | undefined;
  hasPreviousPage: boolean | undefined;
};
const More = ({startCursor,
endCursor,
hasNextPage,
hasPreviousPage}:Props) => {
    const router = useRouter();
    const handleNav =(direction:string)=>{
   const currentParams = new URLSearchParams(window.location.search);
        // console.log('====================================');
        // console.log(currentParams, direction, hasPreviousPage, hasNextPage);
        // console.log('====================================');
   if (direction === "pre" && hasPreviousPage) {
     currentParams.delete("endcursor");
     currentParams.set("startcursor", startCursor || "");
   } else if (direction === "next" && hasNextPage) {
     currentParams.delete("startcursor");
     currentParams.set("endcursor", endCursor || "");
   }

   const newSearchParams = currentParams.toString();
   const newPathname = `${window.location.pathname}?${newSearchParams}`;

   router.push(newPathname);
    }
  return (
    <div className="w-full flexCenter gap-8 my-8">
      {hasPreviousPage && (
        <Button
          title="Previous"
          handleClick={() => handleNav("pre")}
          type="button"
        />
      )}
      {hasNextPage && (
        <Button
          title="Next"
          handleClick={() => handleNav("next")}
          type="button"
        />
      )}
    </div>
  );
}

export default More
