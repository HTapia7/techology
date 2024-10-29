"use client";
import { CldUploadButton } from "next-cloudinary";
import React from 'react';

const UploadWidget = () => {
  return (
    <CldUploadButton
      uploadPreset="your_upload_preset" // Replace with your Cloudinary upload preset
      className="bg-blue-500 text-white p-2 rounded" // Customize your styles here
    >
      Upload Image
    </CldUploadButton>
  );
};

export default UploadWidget;
