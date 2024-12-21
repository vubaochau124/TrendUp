import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets'
import axios from 'axios'
import { backendUrl } from '../../App';
import { toast } from 'react-toastify';

const Product_add = ({token}) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [wearerCategory, setWearerCategory] = useState("Men");
  const [styleCategory, setStyleCategory] = useState("Topwear");
  const [wearerList, setWearerList] = useState([]); 
  const [styleList, setStyleList] = useState([]); 
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchStyleList = async () => {
      try {
        const response_style = await axios.get(backendUrl + '/api/categories/liststyle'); // URL API backend
        setStyleList(response_style.data.list_styles); // Lưu danh sách vào state

        const response_wearer = await axios.get(backendUrl + '/api/categories/listwearer'); // URL API backend
        setWearerList(response_wearer.data.list_wearer); // Lưu danh sách vào state
      } catch (error) {
        console.error('Failed to fetch styleList:', error);
      }
    };
    fetchStyleList();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("persontype", wearerCategory)
      formData.append("productstyle", styleCategory)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("bestseller", bestseller)
      

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})
      
      if (response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="image1" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>

          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="image2" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="image3" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>

          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="image4" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>


        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
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
          <input onChange={(e) => setPrice(e.target.value)} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
        </div>

      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>

          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-teal-200": "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-teal-200": "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-teal-200": "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-teal-200": "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-teal-200": "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller'/>
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-teal-500 text-white'>ADD</button>
    </form>
  )
}

export default Product_add