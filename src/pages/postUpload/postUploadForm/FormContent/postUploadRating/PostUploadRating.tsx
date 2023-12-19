import React from "react";
import {
  Rating,
  RatingCount,
  RatingSection,
  RatingTitle,
  RatingWrapper
} from "../../../postUpload.styles";
import { useFormContext } from "react-hook-form";

export default function PostUploadRating() {
  const { register, setValue, watch } = useFormContext();
  const { ref } = register("rating", { required: true });
  const ratingValue = watch("rating");
  return (
    <RatingSection>
      <RatingTitle>평점*</RatingTitle>
      <RatingWrapper>
        <Rating
          count={5}
          id='rating'
          ref={ref}
          value={ratingValue}
          onChange={(value) => setValue("rating", value, { shouldDirty: true })}
          allowHalf
          autoFocus
        />
        {ratingValue !== 0 && <RatingCount>{ratingValue}</RatingCount>}
      </RatingWrapper>
    </RatingSection>
  );
}
