export const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
export const phoneRegex = /01[016789]-[^0][0-9]{3,4}-[0-9]{3,4}/;
export const displayNameRegex = /^(?=.*[a-zA-Z])([a-zA-Z0-9]{4,10})$/;

export const emailRegexErrorMsg = "이메일 형식을 확인해주세요.";
export const passwordRegexErrorMsg =
  "8-16자 특수문자, 숫자, 영문을 포함해야합니다.";
export const phoneRegexErrorMsg = "휴대폰 번호 형식을 확인해주세요.";
export const displayNameRegexErrorMsg =
  "4-10자 영문 소문자, 영문 소문자+숫자를 입력해주세요.";
