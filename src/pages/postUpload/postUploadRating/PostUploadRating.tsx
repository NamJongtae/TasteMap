import React from "react";
import { Rating, RatingCount, RatingSection, RatingTitle, RatingWrapper } from './postUploadRating.styles';
interface IProps {
  ratingValue: number;
  setRatingValue: React.Dispatch<React.SetStateAction<number>>;
}
export default function PostUploadRating({
  ratingValue,
  setRatingValue
}: IProps) {
  return (
    <RatingSection>
      <RatingTitle>평점*</RatingTitle>
      <RatingWrapper>
        <Rating
          count={5}
          value={ratingValue}
          onChange={(value) => setRatingValue(value)}
          allowHalf
          autoFocus
        />
        {ratingValue !== 0 && <RatingCount>{ratingValue}</RatingCount>}
      </RatingWrapper>
    </RatingSection>
  );
}
