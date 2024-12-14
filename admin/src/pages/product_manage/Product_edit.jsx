import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets'
import axios from 'axios'
//import {backendUrl} from '../App.js'

const Product_edit = ({ productId }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [image5, setImage5] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [wearerCategory, setWearerCategory] = useState("Men");
  const [styleCategory, setStyleCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Fetch existing product details when component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/${productId}`)
        const product = response.data;

        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setWearerCategory(product.wearerCategory)
        setStyleCategory(product.styleCategory)
        setBestseller(product.bestseller)
        setSizes(product.sizes)

        // If you have image URLs, you might need to convert them to File objects
        // This is a placeholder and might need adjustment based on your backend
        // setImage1(product.image1)
        // setImage2(product.image2)
        // ... and so on
      } catch (error) {
        console.error("Error fetching product details:", error)
      }
    }

    if (productId) {
      fetchProductDetails()
    }
  }, [productId])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("wearerCategory", wearerCategory)
      formData.append("styleCategory", styleCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)
      image5 && formData.append("image5", image5)

      const response = await axios.put(`${backendUrl}/api/product/edit/${productId}`, formData)
      console.log(response.data);
      // Optional: Add navigation or success message after editing

    } catch (error) {
      console.error("Error updating product:", error)
    }
  }  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload/Edit Image</p>

        <div className='flex gap-2'>
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={`image${num}`} htmlFor={`image${num}`}>
              <img 
                className='w-20' 
                src={eval(`!image${num}`) ? assets.upload_area : URL.createObjectURL(eval(`image${num}`))} 
                alt={`image${num}`} 
              />
              <input 
                onChange={(e) => eval(`setImage${num}`)(e.target.files[0])} 
                type="file" 
                id={`image${num}`} 
                hidden 
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          className='w-full max-w-[500px] px-3 py-2' 
          type="text" 
          placeholder='Type here' 
          required 
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea 
          onChange={(e) => setDescription(e.target.value)} 
          value={description} 
          className='w-full max-w-[500px] px-3 py-2' 
          placeholder='Write content here' 
          required 
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Wearer category</p>
          <select 
            onChange={(e) => setWearerCategory(e.target.value)} 
            value={wearerCategory} 
            className='w-full px-3 py-2'
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Style category</p>
          <select 
            onChange={(e) => setStyleCategory(e.target.value)} 
            value={styleCategory} 
            className='w-full px-3 py-2'
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
            <option value="Underwear">Underwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input 
            onChange={(e) => setPrice(e.target.value)} 
            value={price}
            className='w-full px-3 py-2 sm:w-[120px]' 
            type="Number" 
            placeholder='25' 
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div 
              key={size} 
              onClick={() => setSizes(prev => 
                prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]
              )}
            >
              <p className={`${sizes.includes(size) ? "bg-teal-200": "bg-slate-200"} px-3 py-1 cursor-pointer`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input 
          onChange={() => setBestseller(prev => !prev)} 
          checked={bestseller} 
          type="checkbox" 
          id='bestseller'
        />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-teal-500 text-white'>UPDATE</button>
    </form>
  )
}

export default Product_edit