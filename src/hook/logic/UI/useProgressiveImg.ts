import { useEffect, useState } from "react";
import { useSupportedWebp } from "../../useSupportedWebp";
import { useInView } from "react-intersection-observer";

interface IProps {
  src: string;
}
export const useProgressiveImg = ({ src }: IProps) => {
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

  return { imgSrc, customClass, ref };
};
