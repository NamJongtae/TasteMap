export const resolveWebp = (img: string, fallbackExt: string) => {
  const isWebpSupported = JSON.parse(
    localStorage.getItem("webpSupported") || "false"
  );
  // 이미지 포맷
  const ext = img.split(".").pop();
  // webpSupported false, ext가 webp인 경우
  if (!isWebpSupported && ext === "webp") {
    return img.replace("/webp", "").replace(".webp", `.${fallbackExt}`);
  }
  return img;
};
