import fs from 'fs/promises';
import { serializeUploadResult } from '../utils';
import type { ImageData, UploadState } from '../types';
import type { APIContext } from 'astro';

export async function post({ request, redirect }) {
  /*
 : APIContext
  */
  let uploadState: UploadState;
  let imagesData: ImageData[] = [];
  const formData = await request.formData();
  let imageData: ImageData;
  try {
    for (let image of formData.getAll('images')) {
      imageData = {
        name: image.name,
        buffer: Buffer.from(await image.arrayBuffer()),
        type: image.type,
      };

      console.log(`${imageData.name} is getting saved...\n`);
      await fs.writeFile(`./${imageData.name}`, imageData.buffer);

      uploadState = 'success';
      console.log(`${imageData.name} was successfuly saved\n\n`);
      imagesData.push(imageData);
    }
  } catch (e) {
    console.error(`Failed to save ${imageData.name}\n\n`);
    console.error(e);
    uploadState = 'failed';
  }
  const serializedUploadResult = serializeUploadResult({
    imagesData,
    uploadState,
  });

  const redirectTo = new URL(
    'https://pariamwnbgithub-nlwx--3000.local-credentialless.webcontainer.io/'
  );

  redirectTo.search = serializedUploadResult;
  return redirect(redirectTo.toString());
}
