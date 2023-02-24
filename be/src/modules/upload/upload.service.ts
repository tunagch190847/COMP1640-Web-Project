/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorMessage } from 'enum/error';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/config/firebase.config';

// import { initializeFireBaseApp } from 'src/config/firebase';

// const md5 = require('md5');
// const firebase = require('src/config/checkFb');

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  /**
   * Solution 1
   * @param files
   * @param folder
   * @returns
   */
  async uploadFireBase(files: Array<Express.Multer.File>) {
    const data = [];
    const pdf = files.filter((el) => el.mimetype == 'application/pdf');
    if (pdf.length > 10) {
      throw new HttpException(
        ErrorMessage.FILE_PDF_MAX,
        HttpStatus.BAD_REQUEST,
      );
    }
    for (const file of files) {
      const fileUpload = await this.save(file);

      // const fileUpload = files
      //   .replace(
      //     'https://firebasestorage.googleapis.com/v0/b/uploadfb-6dc7e.appspot.com/o/files%2F',
      //     '',
      //   )
      //   .split('?')[0];

      data.push({
        file_url: fileUpload,
        size: file.size,
      });
    }
    return data;
  }

  async save(file: Express.Multer.File) {
    try {
      const imageRef = ref(storage, `files/${file.originalname}`);
      const snapshot = await uploadBytes(imageRef, file.buffer);
      const url = await getDownloadURL(snapshot.ref);

      console.log(url);
      return url;

      // console.log(bucket);

      // const storage = getStorage();
      // console.log(storage);
      // const storageRef = ref(storage, `files/${file.originalname}`);

      // const snapshot = await uploadBytesResumable(storageRef, file.buffer);

      // const downloadURL = await getDownloadURL(snapshot.ref);
    } catch (e) {
      return e.ErrorMessage;
    }
  }
}
