import { debounce } from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { fetchDuplication } from "../api/firebase/validationAPI";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useValidationInput = (
  initialValue: string,
  type: string,
  checkDuplication: boolean
) => {
  const displayNameReg = /^(?=.*[a-zA-Z])([a-zA-Z0-9]{4,10})$/;

  const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  const phoneReg = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;

  const [value, setValue] = useState(initialValue);
  const [valid, setValid] = useState({ errorMsg: "", valid: false });
  const [typeInfo, setTypeInfo] = useState({
    errorMsg: "",
    duplicationMsg: "",
    reg: / /
  });

  // type에따라 typeInfo 값 설정
  useEffect(() => {
    if (type === "displayName") {
      setTypeInfo({
        errorMsg: "4-10자 영문 소문자, 영문 소문자+숫자를 입력해주세요.",
        duplicationMsg: "중복된 닉네임입니다.",
        reg: displayNameReg
      });
    } else if (type === "email") {
      setTypeInfo({
        errorMsg: "유효한 이메일을 입력해주세요.",
        duplicationMsg: "중복된 이메일입니다.",
        reg: emailReg
      });
    } else if (type === "password") {
      setTypeInfo({
        errorMsg: "8-16자 특수문자, 숫자, 영문을 포함해야합니다.",
        duplicationMsg: "",
        reg: passwordReg
      });
    } else if (type === "phone") {
      setTypeInfo({
        errorMsg: "유효한 휴대폰 번호를 입력하세요.",
        duplicationMsg: "이미 사용중인 휴대폰 번호 입니다.",
        reg: phoneReg
      });
    }
  }, []);

  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  const duplicationDebounce = useCallback(
    debounce(async (value) => {
      const isDulplcation = await fetchDuplication(
        type === "phone" ? value.replace(/-/g, "") : value,
        type
      );
      // 프로필 변경시 기존 자신의 닉네임은 중복검사 제외 하기 위해 사용
      if (isDulplcation && myInfo.displayName !== value.toLowerCase()) {
        setValid({
          errorMsg: typeInfo.duplicationMsg,
          valid: false
        });
      } else {
        setValid({ errorMsg: "", valid: true });
      }
    }, 200),
    [typeInfo]
  );

  const validation = useCallback(
    (value: string) => {
      if (type === "phone" && value.length < 12) {
        setValid({ errorMsg: typeInfo.errorMsg, valid: false });
        return;
      }
      if (typeInfo.reg.test(value)) {
        if (checkDuplication) {
          setValid({ errorMsg: "", valid: false });
          duplicationDebounce(value);
        } else {
          setValid({ errorMsg: "", valid: true });
        }
      } else {
        setValid({ errorMsg: typeInfo.errorMsg, valid: false });
      }
    },
    [type, typeInfo, checkDuplication]
  );

  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value.trim());
      validation(e.target.value.trim());
    },
    [validation]
  );

  return [value, valid, onChangeValue, setValue, setValid] as const;
};
