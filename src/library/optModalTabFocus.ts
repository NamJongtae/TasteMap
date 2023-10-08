// 키보드 포커스 웹 접근성 최적화 함수
// 첫 번째 인자로는 이벤트
// 두 번째 인자로 이전 focus될 대상, 세 번째 인자로 다음 focus될 대상
export const optModalTabFocus = (e: React.KeyboardEvent<HTMLElement>, previousTarget: HTMLElement | null, nextTarget?: HTMLElement | null) => {
  if (e.shiftKey && e.keyCode === 9 && previousTarget) {
    e.preventDefault();
    previousTarget.focus();
  } else if (nextTarget && e.keyCode === 9) {
    e.preventDefault();
    nextTarget.focus();
  }
};
