import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { resolveWebp } from '../../../library/resolveWebp';

interface IProps {
  src: string;
}
export const useProgressiveImg = ({ src }: IProps) => {
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

  return { imgSrc, customClass, ref };
};
