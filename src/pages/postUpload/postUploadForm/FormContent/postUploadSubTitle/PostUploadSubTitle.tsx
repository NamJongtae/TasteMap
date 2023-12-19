import React from "react";

interface IProps {
  title: string;
}

export default function PostUploadSubTitle({ title }: IProps) {
  return <h2 className='a11y-hidden'>{title}</h2>;
}
