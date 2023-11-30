import React, { useEffect, useState } from "react";
import { Img } from "./progressiveImg.style";
import { useInView } from "react-intersection-observer";
import { CSSProperties } from "styled-components";
import { useSupportedWebp } from '../../../hook/useSupportedWebp';

interface IProps {
  src: string;
  alt: string;
  styles: CSSProperties;
}
export default function ProgressiveImg({ src, styles, alt }: IProps) {
  const { resolveWebp } = useSupportedWebp();
  const placeholderSrc = resolveWebp("/assets/webp/placeholder.webp", "svg");
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const [isLazy, setIsLazy] = useState(true);
  const { ref, inView } = useInView();
  const customClass = isLazy ? "loading" : "loaded";

  useEffect(() => {
    if (inView && imgSrc === placeholderSrc) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLazy(false);
      };
      img.onerror = () => {
        setImgSrc(resolveWebp("/assets/webp/no-image.webp", "svg"));
        setIsLazy(false);
      };
    }
  }, [src, inView]);

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
