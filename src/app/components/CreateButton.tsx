"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  price: string;
  quantity: string;
  description: string;
  image: string;
}

const ProductModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    quantity: '',
    description: '',
    image: '',
  });

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Upload the image to Cloudinary
    if (file) {
      const formDataToUpload = new FormData();
      formDataToUpload.append("file", file);
      formDataToUpload.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

      try {
        const uploadResponse = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, formDataToUpload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Get the secure URL of the uploaded image
        const imageSecureUrl = uploadResponse.data.secure_url; // Cloudinary returns the URL
        setFormData((prev) => ({ ...prev, image: imageSecureUrl })); // Update the image field with the URL

      } catch (error) {
        toast.error("Image upload failed. Please try again.", { duration: 10000 });
        return; // Stop if image upload fails
      }
    }

    // Prepare the data for creating the product
    const productData = {
      name: formData.name,
      price: formData.price,
      quantity: formData.quantity,
      description: formData.description,
      image: formData.image, // Include the image URL
    };

    try {
      const response = await axios.post('/api/products/create-products', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success(response.data.message, { duration: 10000 });
      toggleModal(); // Close the modal on success
      // Reset the form data
      setFormData({ name: '', price: '', quantity: '', description: '', image: '' });
      setFile(null); // Clear the file input
    } catch (error) {
      toast.error("An error occurred while submitting the form. Please try again.", { duration: 10000 });
    }
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        type="button"
      >
        Create Product +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8"
                onClick={toggleModal}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="p-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4">
                <div className="col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border rounded-lg focus:ring-primary-600 dark:bg-gray-600 dark:border-gray-500"
                    placeholder="Type product name"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border rounded-lg focus:ring-primary-600 dark:bg-gray-600 dark:border-gray-500"
                    placeholder="$2999"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border rounded-lg focus:ring-primary-600 dark:bg-gray-600 dark:border-gray-500"
                    placeholder="1"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2.5 text-sm border rounded-lg focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                    placeholder="Write product description here"
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleFileChange}
                    className="w-full p-2.5 text-sm border rounded-lg focus:ring-primary-600 dark:bg-gray-600 dark:border-gray-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Add new product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductModal;
