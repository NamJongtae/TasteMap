import imageCompression from "browser-image-compression"

export const getCompressionImg = async (file:File) => {
  try{
    const options = {
        maxSizeMB: 10, // 이미지 최대 용량
        maxWidthOrHeight: 256, // 이미지 최대 너비 및 높이
        useWebWorker: true, // webworker 적용 유무
        // webworker : 웹 워커 API가 멀티 스레딩을 지원하게 되어 워커를 이용하면 워커에서 작성된 스크립트는 
        // 메인 스레드에서 분기되어 독립된 스레드로 실행되기 때문에 메모리 자원을 효율적으로 사용할 수 있다.
    }

    const compressedFileBlob = await imageCompression(file, options);
    const compressedFile = new File([compressedFileBlob], file.name, { type: file.type });
    const preview = await imageCompression.getDataUrlFromFile(file);
    return {compressedFile, preview}
  } catch(error) {
    console.log(error)
  }
}