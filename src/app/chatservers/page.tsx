"use client"
import { useState } from "react";

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Upload failed');
    }
    return result.imgUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const UploadComponent = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        setImageUrl(url);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <div className="pt-24">
      <input type="file" onChange={handleFileChange} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default UploadComponent;
