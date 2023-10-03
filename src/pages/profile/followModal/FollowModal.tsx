import React, { useEffect, useRef } from "react";
import {
  CloseBtn,
  Dim,
  FollowModalWrapper,
  ModalTitle,
  ModalTitleBar,
  Wrapper
} from "./followModal.styles";
import FollowList from "./FollowList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { profileSlice } from "../../../slice/profileSlice";
import { isMobile } from "react-device-detect";

interface IProps {
  isFollower: boolean;
}
export default function FollowModal({ isFollower }: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement>(null);
  const isOpenFollowerModal = useSelector(
    (state: RootState) => state.profile.isOpenFollowerModal
  );
  const isOpenFollowingModal = useSelector(
    (state: RootState) => state.profile.isOpenFollowingModal
  );
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.style.animation = "FollowModalmoveDown 1s";
      setTimeout(() => {
        document.body.style.overflow = "auto";
        if (isFollower) {
          dispatch(profileSlice.actions.setIsOpenFollowerModal(false));
        } else {
          dispatch(profileSlice.actions.setIsOpenFollowingModal(false));
        }
      }, 700);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(profileSlice.actions.setFollowListData([]));
    };
  }, []);

  // 뒤로가기 버튼을 눌러도 현재 페이지가 유지됨
  useEffect(() => {
    if (isMobile) {
      window.history.pushState(null, "", window.location.href);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      window.onpopstate = () => {
        history.go(1);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.handleGoback();
      };
      // 뒤로가기 버튼을 눌렀을 경우 실행될 로직: 모달창 닫기
      window.onpopstate = () => {
        closeModal();
      };
    }
  }, [isOpenFollowerModal, isOpenFollowingModal]);

  return (
    <Wrapper>
      <Dim
        onClick={() => {
          if (isMobile) {
            // 빈 히스토리를 없애기 위해 뒤로가기
            history.back();
          }
          closeModal();
        }}
      ></Dim>
      <FollowModalWrapper ref={modalRef}>
        <ModalTitleBar>
          <ModalTitle>{isFollower ? "팔로워" : "팔로잉"}</ModalTitle>
        </ModalTitleBar>
        <FollowList isFollower={isFollower} />
        <CloseBtn
          onClick={() => {
            if (isMobile) {
              history.back();
            }
            closeModal();
          }}
        />
      </FollowModalWrapper>
    </Wrapper>
  );
}
