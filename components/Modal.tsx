"use client";

import { ReactNode, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Modal = ({ children }: { children: ReactNode }) => {
  // using over lay Example !!!!!!!!!
  const router = useRouter();
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const handleClose = useCallback(() => {
    //go back one page
    router.push("/");
  },[router]);
  const handleClick = useCallback((e:React.MouseEvent) => {
    //one way to do it Other is by stop event propagation
    if((e.target===overlay.current) ){
          handleClose();
    }
   
  },[handleClose,overlay]);
  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <button className="absolute top-8 right-8" onClick={handleClose}>
        <Image src="/close.svg" alt="close" height={20} width={20} />
      </button>
      <div className="modal_wrapper" ref={wrapper}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
