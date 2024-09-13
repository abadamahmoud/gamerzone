import { cloudinary } from "./cloudinary";

interface CustomUploadApiResponse {
  public_id: string;
  secure_url: string;
  // Add other fields based on the Cloudinary response
}

interface CustomUploadApiErrorResponse {
  message: string;
  // Add other fields based on the Cloudinary error response
}

type UploadResponse = 
  | { success: true; result: CustomUploadApiResponse }
  | { success: false; error: CustomUploadApiErrorResponse };

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
    .catch((error) => resolve({ success: false, error: { message: error.message } }));
  });
};

export { uploadToCloudinary };

