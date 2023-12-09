import React from "react";

interface IProps {
  highLightText: string;
}

export const useTextHighLight = ({ highLightText }: IProps) => {
  // 검색 텍스트 하이라이트 효과
  const getTextHighLight = (text: string) => {
    // 검색 키워드를 기준으로 문자열이 나눔
    const parts = text.split(new RegExp(`(${highLightText})`, "gi"));

    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part.toLowerCase() === highLightText.toLowerCase() ? (
              // 검색 키워드와 일치하는 부분을 파란색으로 강조
              <span style={{ color: "#208afa" }}>{part}</span>
            ) : (
              // 검색 키워드와 일치하지 않는 부분은 그대로 표시
              part
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return { getTextHighLight };
};
