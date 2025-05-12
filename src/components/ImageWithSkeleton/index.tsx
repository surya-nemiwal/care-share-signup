"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

type ImageWithSkeletonProps = {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

const ImageWithSkeleton = (props: ImageWithSkeletonProps) => {
  const {
    src,
    alt = "image-alt",
    className,
    imgClassName,
    priority = false,
  } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
    >
      {isLoading && <div className={styles.skeleton} />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`${imgClassName} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        priority={priority}
      />
    </div>
  );
};

export default ImageWithSkeleton;
