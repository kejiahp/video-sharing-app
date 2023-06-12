import cloudinary, { UploadApiOptions } from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const opts: UploadApiOptions = {
  resource_type: "image",
  invalidate: true,
  overwrite: true,
};

/**
 * This is absolutely useless in this project but left it here for reference in other projects.
 */
const uploadImage = (image: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      }
      console.log(error?.message);
      return reject({ message: error?.message });
    });
  });
};

export default uploadImage;
