import { cloudinary } from "./cloudinary";

type UploadResponse = 
  { success: true; result?: cloudinary.UploadApiResponse } | 
  { success: false; error: cloudinary.UploadApiErrorResponse };

const uploadToCloudinary = (
  fileUri: string, fileName: string): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      resource_type: "auto",
      filename_override: fileName,
      folder: "profile-images", // Adjust folder as needed
      use_filename: true,
    })
    .then((result) => resolve({ success: true, result }))
    .catch((error) => reject({ success: false, error }));
  });
};

export { uploadToCloudinary };
