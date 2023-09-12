import imageCompression from "browser-image-compression"
/**
 * 프로필 이미지를 압축해주는 함수
 */
export const getCompressionImg = async (file:File, type: "profile"|"post") => {
  try{
    const options = {
        maxSizeMB: 10, // 이미지 최대 용량
        maxWidthOrHeight: type==="profile" ? 256 : 320, // 이미지 최대 너비 및 높이
        useWebWorker: true, // webworker 적용 유무
        // webworker : 웹 워커 API가 멀티 스레딩을 지원하게 되어 워커를 이용하면 워커에서 작성된 스크립트는 
        // 메인 스레드에서 분기되어 독립된 스레드로 실행되기 때문에 메모리 자원을 효율적으로 사용할 수 있다.
    }
    // 압축한 이미지의 blob 형식으로 가져옴
    const compressedBlob = await imageCompression(file, options);
    // blob 형식을 File 형식으로 변환
    const compressedFile = new File([compressedBlob], file.name, { type: file.type });
    // 압축한 이미지 미리보기 생성
    const compressedPreview = await imageCompression.getDataUrlFromFile(file);
    // 압축한 이미지 파일과 미리보기를 객체형태로 반환
    return {compressedFile, compressedPreview}
  } catch(error) {
    console.log(error)
  }
}
