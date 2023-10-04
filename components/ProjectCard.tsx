"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { fadeIn } from "@/lib/utls";
type Props = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
  index?: number;
};
const ProjectCard = ({
  id,
  image,
  title,
  name,
  avatarUrl,
  userId,
  index,
}: Props) => {
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");
  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 1000));
    setRandomViews(
      String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
    );
  }, []);
  return (
    <Tilt>
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeIn("right", "spring", (index || 0) * 0.5, 0.75)}
        className="flexCenter flex-col rounded-2xl drop-shadow-card"
      >
        <Link
          href={`/project/${id}`}
          className={
            "flexCenter group relative w-full h-full  max-w-xs overflow-hidden bg-cover bg-no-repeat"
          }
        >
          <Image
            src={image}
            width={400}
            height={300}
            alt="thumbnail"
            className="w-full h-full object-cover rounded-2xl max-w-xs transition duration-300 ease-in-out hover:scale-110"
          />
          <div className="hidden group-hover:flex profile_card-title">
            <p className="w-full">{title}</p>
          </div>
        </Link>
        <div className=" w-full px-2 mt-3 font-semibold text-sm flexBetween text-light-white-500 ">
          <Link href={`/profile/${userId}`}>
            <div className="flexCenter gap-2">
              <Image
                src={avatarUrl}
                width={24}
                height={24}
                alt="Profile Image"
                className="rounded-full"
              />
              <p>{name}</p>
            </div>
          </Link>
          <div className="flexCenter gap-3">
            <div className="flexCenter gap-2">
              <Image src="/hearth.svg" width={13} height={12} alt="heart" />
              <p className="text-sm">{randomLikes}</p>
            </div>
            <div className="flexCenter gap-2">
              <Image src="/eye.svg" width={12} height={10} alt="eye" />
              <p className="text-sm">{randomViews}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default ProjectCard;


