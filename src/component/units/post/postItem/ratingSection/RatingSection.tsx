import React from "react";
import { Rating, RatingCount, RatingWrapper } from "../../postList/post.styles";

interface IProps {
  rating: number;
}

export default function RatingSection({ rating }: IProps) {
  return (
    <RatingWrapper>
      <h3 className='a11y-hidden'>평점</h3>
      <Rating value={rating} disabled={true} allowHalf />{" "}
      <RatingCount>{rating}</RatingCount>
    </RatingWrapper>
  );
}
