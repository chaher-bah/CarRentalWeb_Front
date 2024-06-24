import React from 'react'
import { IconPhone } from "@tabler/icons-react";
import "../dist/PhoneBannerModule.css"
const PhoneBanner = () => {
  return (
  <>
    <section className='phonebanner-section'>
    <div className="book-banner">
        <div className="book-banner__overlay">
            <div className="container">
                <div className="text-content">
                    <h2>N'hesiter Pas De Nous Contacter</h2>
                    <span><IconPhone width={60} height={50} /><h3>(+216) 95 077 703 </h3></span>
                </div>
             </div>
        </div>
    </div>
    </section>
  </>
  )
}

export default PhoneBanner