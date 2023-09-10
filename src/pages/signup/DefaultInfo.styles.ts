import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: auto;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const FormWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-width: 450px;
  padding: 30px 40px;
  @media screen and (max-width: 431px) {
    padding: 30px 30px;
  }
  background-color: #f5f5f5;
`;

export const Title = styled.h1`
  margin-top: 30px;
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 500;
`;

export const ProgressWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 80px;
`;
export const ProgressTitle = styled.h2``;

export const ProgressCheckWrapper = styled.div`
  position: relative;
`;

export const ProgressCheckText = styled.p`
  position: absolute;
  font-size: 14px;
  width: 100px;
  top: 50px;
  left: -15px;
  @media screen and (max-width: 431px) {
    font-size: 12px;
    left: -10px;
  }
`;
export const ProgressCheck = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: ${(props: { active: boolean }) =>
    props.active ? "2px solid #627af5" : "2px solid #bdbdbd"};

  flex-shrink: 0;
  background: ${(props) =>
      props.active
        ? document.body.classList.contains("webp")
          ? 'url("/assets/webp/icon-check-active.webp")'
          : 'url("/assets/icon-check-active.svg")'
        : document.body.classList.contains("webp")
        ? 'url("/assets/webp/icon-check.webp")'
        : 'url("/assets/icon-check.svg")'}
    no-repeat center / 20px;
  transition: all 0.5s;

  &.defalut {
    transition-delay: ${(props) => (props.active ? "" : "0.3s")};
  }
  &.profile {
    transition-delay: ${(props) => (props.active ? "0.3s" : "")};
  }
`;

export const ProgressBar = styled.div`
  position: relative;
  height: 2px;
  background-color: #bdbdbd;
  width: 100%;
  ::after {
    position: absolute;
    content: "";
    width: ${(props: { percentage: string }) =>
      props.percentage ? props.percentage : "0"};
    height: 2px;
    background-color: #627af5;
    transition: all 0.5s;
    transition-delay: ${(props: { percentage: string }) =>
      props.percentage === "50%" ? "0.3s" : ""};

    @media screen and (max-width: 431px) {
      width: ${(props) => (props.percentage ? props.percentage : "0")};
    }
  }
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding-bottom: 30px;
`;

export const InputWrapper = styled.div`
  & > p {
    margin-top: 10px;
  }
`;

export const SignupBtn = styled.button`
  width: 100%;
  background-color: ${(props) =>
    props.disabled ? "#cbcbcb" : "gold"};
  cursor: ${(props) => (props.disabled ? "default" : "cursor")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
`;