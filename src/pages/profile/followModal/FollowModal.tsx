import React, { useRef } from "react";
import {
  CloseBtn,
  Dim,
  FollowModalWrapper,
  ModalTitle,
  ModalTitleBar,
  Wrapper
} from "./followModal.styles";
import FollowList from "./FollowList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { profileSlice } from "../../../slice/profileSlice";

interface IProps {
  isFollower: boolean;
}
export default function FollowModal({ isFollower }: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.style.animation = "FollowModalmoveDown 1s";
    }
    setTimeout(() => {
      document.body.style.overflow = "auto";
      if (isFollower) {
        dispatch(profileSlice.actions.setIsOpenFollowModal(false));
      } else {
        dispatch(profileSlice.actions.setIsOpenFollowingModal(false));
      }
    }, 700);
  };
  return (
    <Wrapper>
      <Dim onClick={closeModal}></Dim>
      <FollowModalWrapper ref={modalRef}>
        <ModalTitleBar>
          <ModalTitle>{isFollower ? "팔로워" : "팔로잉"}</ModalTitle>
        </ModalTitleBar>
        <FollowList isFollower={isFollower} />
        <CloseBtn onClick={closeModal} />
      </FollowModalWrapper>
    </Wrapper>
  );
}
