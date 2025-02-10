import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/slices/productSlice'; // Import your addProduct action
import imageCompression from "browser-image-compression";
const AddProducts = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: null,
  });

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.product); // Access loading and error state

  const handleImageUpload = async (e) => {
    let val = e.target.files[0];

    const options = {
      maxSizeMB: 1, // Maximum file size (in MB)
      maxWidthOrHeight: 800, // Max width or height in pixels
      useWebWorker: true, // Use web workers for performance
    };

    try {
      // Compress the image
      const compressedFile = await imageCompression(val, options);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile); // Convert the compressed image to base64

      reader.addEventListener("load", () => {
        let imageLoader = reader.result;

        // Set the compressed image as base64
        setProductData((prevState) => ({
          ...prevState,
          imageUrl: imageLoader,
        }));
      });
    } catch (error) {
      console.log("Error during image compression:", error);
    }
  };
  //
 

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productData.name || !productData.price || !productData.stock || !productData.description || !productData.imageUrl) {
      window.alert("Please fill all fields and upload an image.");
      return;
    }

    dispatch(addProduct(productData))
      .then(() => {
        if (!error) {
          window.alert("Product Added Successfully");
        }
      })
      .catch((error) => {
        console.log("Error adding product:", error);
      });

    setProductData({ name: '', price: '', stock: '', description: '', imageUrl: null });
  };

  return (
    <div className='my-[10%] text-center'>
      <h1 className='text-[40px] font-gorditaMedium font-AbrilRegular max-[550px]:text-[30px] max-[370px]:text-[25px] text-[#244262]'>
        Add Products
      </h1>
      <div className='w-[50%] max-[750px]:w-[80%] max-[500px]:w-[100%] max-[650px]:text-[13px] mx-auto'>
        <input
          className='bg-[#EBF5FF] w-full p-[4%] mb-[2%]'
          type='text'
          placeholder='Product Name'
          value={productData.name}
          onChange={handleChange}
          name="name"
        />
        <br />
        <input
          className='bg-[#EBF5FF] w-full p-[4%] mb-[2%]'
          type='number'
          placeholder='MRP'
          value={productData.price}
          onChange={handleChange}
          name="price"
        />
        <br />
        <input
          type='file'
          id='myFile'
          name='filename'
          multiple
          accept='.jpg,.jpeg,.png,.webp'
          className='p-[4%] bg-[#EBF5FF] w-full mb-[2%] font-gorditaRegular'
          onChange={handleImageUpload}
        />
        <br />
        <input
          className='bg-[#EBF5FF] w-full p-[4%] mb-[2%]'
          type='number'
          placeholder='Stock'
          value={productData.stock}
          onChange={handleChange}
          name="stock"
        />
        <br />
        <textarea
          type='text'
          className='w-full h-[100px] p-[4%] outline-none bg-[#EBF5FF]'
          placeholder='Description'
          value={productData.description}
          onChange={handleChange}
          name="description"
        />
        <br />
        <button
          className='bg-[#94C4F7] py-[3%] px-[10%] font-gorditaBold text-[12px] tracking-[2px] mb-[5%] text-white'
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Adding Product...' : 'ADD PRODUCT'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default AddProducts;
