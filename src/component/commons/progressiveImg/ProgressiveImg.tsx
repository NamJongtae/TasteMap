import React from "react";
import { Img } from "./progressiveImg.style";
import { CSSProperties } from "styled-components";
import { useProgressiveImg } from "../../../hook/logic/UI/useProgressiveImg";

interface IProps {
  src: string;
  alt: string;
  styles: CSSProperties;
}
export default function ProgressiveImg({ src, styles, alt }: IProps) {
  const { imgSrc, customClass, ref } = useProgressiveImg({ src });

  return (
    <Img
      src={imgSrc}
      className={customClass}
      style={styles}
      loading='lazy'
      alt={alt}
      ref={ref}
    />
  );
}
