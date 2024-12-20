import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets'
import axios from 'axios'
import { backendUrl } from '../../App';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
//import {backendUrl} from '../App.js'

const Product_edit = () => {
  const { product_id } = useParams();
  let [image1, setImage1] = useState(false);
  let [image2, setImage2] = useState(false);
  let [image3, setImage3] = useState(false);
  let [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [wearerCategory, setWearerCategory] = useState("Men");
  const [styleCategory, setStyleCategory] = useState("Topwear");
  const [wearerList, setWearerList] = useState([]); 
  const [styleList, setStyleList] = useState([]); 
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Fetch existing product details when component mounts
  async function convertToFiles(imageUrls) {
      const files = await Promise.all(
          imageUrls.map(async (url, index) => {
              const response = await fetch(url);
              const blob = await response.blob(); // Chuyển nội dung thành Blob
              return blob
          })
      );
      return files;
  }

  
  const fetchProductDetails = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/product/single", { product_id })
      const response_size = await axios.post(backendUrl + "/api/product/sizes", { product_id } )
      const response_style = await axios.get(backendUrl + '/api/categories/liststyle'); // URL API backend
      setStyleList(response_style.data.list_styles); // Lưu danh sách vào state

      const response_wearer = await axios.get(backendUrl + '/api/categories/listwearer'); // URL API backend
      setWearerList(response_wearer.data.list_wearer); // Lưu danh sách vào state
      
      
      const product = response.data.message;
      let list_sizes = [];
      for(let i = 0; i < response_size.data.message.length; i++){
        list_sizes.push(response_size.data.message[i].size)
      }
      
      
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setWearerCategory(product.person_type_name)
      setStyleCategory(product.product_style_name)
      setBestseller(product.bestseller)
      setSizes(list_sizes)

      const images = product.images ? product.images.split(";") : []
      convertToFiles(images).then(files => {
        console.log("Converted Files:", files); // Các phần tử của mảng bây giờ là các File
      });
      
      setImage1(images[0])
      setImage2(images[1])
      setImage3(images[2])
      setImage4(images[3])
      
      console.log(image1, images[0])
    } catch (error) {
      console.error("Error fetching product details:", error)
    }
  }
  useEffect(() => {
    if (product_id) {
      fetchProductDetails()
      // console.log(name)
    }
  }, [product_id])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()

      formData.append("id", product_id)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("persontype", wearerCategory)
      formData.append("productstyle", styleCategory)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("bestseller", bestseller)
      
      if (typeof image1 === 'string') {
        const response = await fetch(image1); // Lấy file từ URL
        const blob = await response.blob();
        setImage1(blob)
      }

      if (typeof image2 === 'string') {
        const response = await fetch(image2); // Lấy file từ URL
        const blob = await response.blob();
        setImage2(blob)
      }

      if (typeof image3 === 'string') {
        const response = await fetch(image3); // Lấy file từ URL
        const blob = await response.blob();
        setImage3(blob)
      }

      if (typeof image4 === 'string') {
        const response = await fetch(image4); // Lấy file từ URL
        const blob = await response.blob();
        setImage4(blob)
      }
      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/edit",formData)
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]);
      }
      if (response.data.success){
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
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
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area  : typeof image1 === 'string'  ? image1 : URL.createObjectURL(image1)} alt="image1" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>

          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area  : typeof image2 === 'string'  ? image2 : URL.createObjectURL(image2)} alt="image2" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area  : typeof image3 === 'string'  ? image3 : URL.createObjectURL(image3)} alt="image3" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>

          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area  : typeof image4 === 'string'  ? image4 : URL.createObjectURL(image4)} alt="image4" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
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
          <select onChange={(e) => setWearerCategory(e.target.value)} value={wearerCategory} className='w-full px-3 py-2'>
            {Array.isArray(wearerList) && wearerList.map((wearer) => (
              <option key={wearer.id} value={wearer.name}>
                {wearer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Style category</p>
          <select onChange={(e) => setStyleCategory(e.target.value)} value={styleCategory} className='w-full px-3 py-2'>
            {Array.isArray(styleList) && styleList.map((style) => (
              <option key={style.id} value={style.name}>
                {style.name}
              </option>
            ))}
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