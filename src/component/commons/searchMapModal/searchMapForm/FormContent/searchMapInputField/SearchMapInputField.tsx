import React from "react";

import { useFormContext } from "react-hook-form";
import { useFocusing } from "../../../../../../hook/useFocusing";
import { optModalTabFocus } from "../../../../../../library/optModalTabFocus";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store/store';
import { SearchMapInput, SearchMapInputWrapper } from '../../../searchMapModal.styles';

interface IProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function SearchMapInputField({ inputRef, closeBtnRef }: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  const { register } = useFormContext();
  const { ref, ...rest } = register("searchKeyword");

  // inpuRef 포커싱
  useFocusing(inputRef);

  return (
    <SearchMapInputWrapper $isWebpSupported={isWebpSupported}>
      <label className='a11y-hidden' htmlFor='searchKeyword'>
        검색
      </label>
      <SearchMapInput
        type='text'
        id='searchKeyword'
        placeholder='가게명, 상호명 검색'
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          optModalTabFocus(e, closeBtnRef.current);
        }}
      />
    </SearchMapInputWrapper>
  );
}
