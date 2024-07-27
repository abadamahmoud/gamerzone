// src/lib/cloudinary.ts
export const uploadImage = async (file: File) => {
     const data = new FormData();
     data.append('file', file);
     data.append('upload_preset', 'your_upload_preset'); // Replace with your actual upload preset
   
     const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
       method: 'POST',
       body: data,
     });
   
     const result = await response.json();
     return result.secure_url;
   };
   