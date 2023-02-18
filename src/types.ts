export type ImageData = {
  name: string;
  buffer: Buffer;
  type: string;
};

export type StringifiedImageData = {
  name: string;
  stringifiedBuffer: string;
  type: string;
};

export type UploadState =  "failed" | "success" | undefined;

export type UploadResult = {
  uploadState: UploadState;
  imagesData: ImageData[];
}