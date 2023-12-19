import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../store/store";
import { useResizeTextArea } from "../../../../../../../hook/useResizeTextArea";
import { useFormContext } from "react-hook-form";
import { CommentSubmitBtn, CommentTextAreaWrapper, TextArea } from '../../../commentModal.styles';

interface IProps {
  textareaType: "leave" | "update";
  isReply: boolean;
  textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}

export default function CommentTextArea({
  textareaType,
  isReply,
  textareaRef
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  const { register, formState } = useFormContext();
  const { ref, ...rest } = register(isReply ? "reply" : "comment", {
    required: true
  });

  useResizeTextArea({ name: isReply ? "reply" : "comment", ref: textareaRef });

  return (
    <CommentTextAreaWrapper textareaType={textareaType}>
      <TextArea
        id={isReply ? "reply" : "comment"}
        placeholder={isReply ? "답글을 입력하세요" : "댓글을 입력하세요."}
        rows={1}
        {...rest}
        ref={(e) => {
          ref(e);
          textareaRef.current = e;
        }}
      />
      <CommentSubmitBtn
        type='submit'
        disabled={!formState.isDirty}
        $isWebpSupported={isWebpSupported}
      />
    </CommentTextAreaWrapper>
  );
}
