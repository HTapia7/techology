import React from 'react';
import axios from 'axios';

interface EditButtonProps {
  id: string;
  name: string;
  price: number;
  // image: string;
  description: string;
}

const EditButton: React.FC<EditButtonProps> = ({ id, name, price, description }) => {

  const handleEdit = async () => {
    try {
      const editResponse = await axios.put('/api/products/update-products', {
        id,
        name,
        price,
        description,
      });
      console.log("Edit response:", editResponse.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <button onClick={handleEdit}>Edit Product</button>
    </div>
  );
};

export default EditButton;
