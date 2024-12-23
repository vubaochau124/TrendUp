import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
        <div className='text-2xl text-center pt-8 border-t'>
            <Title text1={'ABOUT'} text2={'US'}/>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-16'>
            <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                <p>At TrendUp, we believe that fashion is not just about clothing—it's a form of self-expression. Established with a passion for style and quality, we curate a diverse selection of clothing that caters to every individual’s taste and personality. Our team is dedicated to staying ahead of the latest trends while ensuring that our collections reflect timeless elegance and comfort. Whether you’re looking for casual wear, office attire, or something special for a night out, TrendUp has got you covered.</p>
                <p>We understand that the right outfit can make a world of difference, which is why we are committed to providing not just clothes, but outfits that empower you to express your unique style.</p>
                <b className='text-gray-800'>Our Mission</b>
                <p>We aim to make every shopping experience enjoyable and fulfilling, ensuring that our customers find exactly what they need to express their unique personality.</p>
            </div>
        </div>

        <div className='text-4xl py-4'>
            <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Quality Assurace:</b>
                <p className='text-gray-600'>Quality is at the core of everything we do here. We meticulously select materials and work with reputable manufacturers to ensure that every piece of clothing meets our high standards. Our garments undergo rigorous quality checks to guarantee durability, comfort, and fit. We are dedicated to providing our customers with products that not only look good but also stand the test of time.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Convenience:</b>
                <p className='text-gray-600'>We understand that today’s fast-paced lifestyle demands convenience. That’s why we’ve designed our online shopping experience to be seamless and user-friendly. From easy navigation to a secure checkout process, we strive to make your shopping experience as straightforward as possible. Plus, with fast shipping options and hassle-free returns, you can shop with confidence, knowing that we have your back every step of the way.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Exceptional Customer Service:</b>
                <p className='text-gray-600'>Our customers are our top priority. We pride ourselves on delivering exceptional customer service that goes above and beyond expectations. Our dedicated support team is always ready to assist you with any inquiries, whether it’s about sizing, order tracking, or product information. We value your feedback and continuously seek to improve our services to ensure a delightful shopping experience for everyone.</p>
            </div>
        </div>

        {/* <NewsletterBox /> */}
    </div>
  )
}

export default About