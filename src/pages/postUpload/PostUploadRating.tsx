import React from "react";
import {
  Rating,
  RatingCount,
  RatingWrapper,
  Section,
  SectionTitle
} from "./postUpload.styles";

interface IProps {
  ratingValue: number;
  setRatingValue: React.Dispatch<React.SetStateAction<number>>;
}
export default function PostUploadRating({
  ratingValue,
  setRatingValue
}: IProps) {
  return (
    <Section>
      <SectionTitle>평점*</SectionTitle>
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
    </Section>
  );
}
