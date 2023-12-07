import { useInView } from "react-intersection-observer";

export const useKakaomapLazy = () => {
  const [kakaomapRef, inview] = useInView();

  return { kakaomapRef, inview };
};
