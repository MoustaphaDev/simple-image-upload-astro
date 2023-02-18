import type { StringifiedImageData, ImageData, UploadResult } from './types';

function serializeImagesData(imagesData: ImageData[]): string {
  let _imagesData: StringifiedImageData[];

  for (let [index, imageData] of Object.entries(imagesData)) {
    _imagesData[Number(index)].stringifiedBuffer = imageData.buffer.toString();
    _imagesData[Number(index)].name = imageData.name;
    _imagesData[Number(index)].type = imageData.type;
  }
  return JSON.stringify(_imagesData);
}

function deserializeImagesData(imagesDataString: string): ImageData[] {
  const preprocessedImagesData: StringifiedImageData[] =
    JSON.parse(imagesDataString);
  let _imagesData: ImageData[];

  for (let [index, imageData] of Object.entries(_imagesData)) {
    imageData.buffer = Buffer.from(
      preprocessedImagesData[Number(index)].stringifiedBuffer
    );
    imageData.name = preprocessedImagesData[Number(index)].name;
    imageData.type = preprocessedImagesData[Number(index)].type;
  }
  return _imagesData;
}

export function deserializeUploadResult(queryString: string) {
  const searchParams = new URLSearchParams(queryString);
  const { uploadState, imagesData: _imagesDataSerialized } =
    Object.fromEntries(searchParams);
  const imagesData = deserializeImagesData(_imagesDataSerialized);
  const result = { uploadState, imagesData } as UploadResult;
  return result;
}

export function serializeUploadResult(uploadResult: UploadResult): string {
  const { uploadState, imagesData } = uploadResult;
  const serializedImageData = serializeImagesData(imagesData);
  const result = new URLSearchParams({
    uploadState,
    serializedImageData,
  }).toString();
  return result;
}
