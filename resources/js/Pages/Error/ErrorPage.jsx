import { Link, router } from '@inertiajs/react'
import { Button } from "@mui/material";
import React from 'react'

const teamsBanner = "/assets/images/tim-versus.png";
const vindesImage = "/assets/images/vindes-image.png";
const campaignBanner = "/assets/images/campaign-banner-plain.png";
const wallsLogo = "/assets/images/walls-logo.png";

export default function ErrorPage({ status }) {
  const title = {
    503: 'Service Unavailable',
    500: 'Server Error',
    404: 'Page Not Found',
    403: 'Forbidden',
  }[status]

  const description = {
    503: 'Maaf, kita sedang melakukan maintenace, mohon tunggu beberapa saat lagi.',
    500: 'Maaf, terjadi masalah pada server kami, mohon tunggu beberapa saat lagi.',
    404: 'Maaf, halaman yang kamu cari tidak ditemukan.',
    403: 'Maaf, kamu tidak memiliki otorisasi untuk akses halaman ini.',
  }[status]

  return (
    <div className="bg-image-blur relative min-h-screen">
      <div className="min-w-[320px] max-w-md min-h-screen mx-auto bg-white relative shadow-2xl pb-5">
        <main
          className="absolute left-0 w-full h-screen top-0 to-top to-bottom z-50 bg-cover"
          style={{
              backgroundImage: "url(/assets/images/bg-landing.png)",
          }}
        >
            {/* logo walls */}
            <div className="absolute z-30 top-4 right-4">
                <img src={wallsLogo} alt="" className="w-12 h-auto" />
            </div>

            {/* campaign banner */}
            <div className="relative lg:top-8 top-20 sm:top-40 md:top-80 mx-auto">
                <img src={campaignBanner} alt="" className="lg:w-[22rem] w-80 sm:w-80 md:w-[22rem]" />
                <div className='absolute top-48 inset-0'>
                  <h1 className='font-FilsonProBold text-center font-bold text-7xl text-white'>{status}</h1>
                  <p className='text-center text-white mt-5'>{title}</p>
                  <p className='text-center text-white px-4 mt-1'>{description}</p>
                </div>
            </div>

            {/* vindes image */}
            <div className="absolute lg:bottom-0 bottom-0 mx-auto">
              <img src={vindesImage} alt="" className="w-full" />
            </div>

            {/* teams banner */}
            <div className="absolute lg:bottom-24 bottom-36 mx-auto">
                <img src={teamsBanner} alt="" className="w-full" />
            </div>

            {/* cta */}
            <div className="px-4 absolute mx-auto my-0 lg:bottom-10 bottom-[6.5rem] flex items-center justify-center w-full">
                <Button
                    onClick={(e) => {e.preventDefault(); router.get(route('landing'))}}
                    className="button-animation bg-gradient-to-b from-[rgba(242,225,194,1)] 
                    from-1% to-[rgba(246,184,76,1)] to-90% rounded-md shadow-lg"
                >
                    <p
                        className="uppercase text-white px-10 py-2 leading-none font-extrabold 
                    text-lg font-FilsonProBold"
                    >
                        Kembali Ke Halaman Utama
                    </p>
                </Button>
            </div>
        </main>
      </div>
    </div>
  )
}