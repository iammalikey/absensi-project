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
    <div className="relative min-h-screen bg-image-blur">
      <div className="min-w-[320px] max-w-md min-h-screen mx-auto bg-white relative shadow-2xl pb-5">
        <main
          className="absolute top-0 left-0 z-50 w-full h-screen bg-cover to-top to-bottom"
          style={{
              backgroundImage: "url(/assets/images/bg-landing.png)",
          }}
        >
            {/* logo walls */}
            <div className="absolute z-30 top-4 right-4">
                <img src={wallsLogo} alt="" className="w-12 h-auto" />
            </div>

            {/* campaign banner */}
            <div className="relative mx-auto lg:top-[6vh] top-[15vh] md:top-[32vh] md:-left-3">
                <img src={campaignBanner} alt="" className="lg:w-[22rem] w-80 sm:w-80 md:w-[22rem]" />
            </div>

            {/* vindes image */}
            {/* <div className="absolute bottom-0 mx-auto lg:bottom-0">
              <img src={vindesImage} alt="" className="w-full" />
            </div> */}

            {/* teams banner */}
            <div className="absolute w-full mx-auto -translate-x-1/2 bottom-[30vh] inset-x-1/2">
                {/* <img src={teamsBanner} alt="" className="w-full" /> */}
                <div>
                  <h1 className='font-bold text-center text-white font-FilsonProBold text-7xl'>{status}</h1>
                  <p className='mt-5 text-center text-white'>{title}</p>
                  <p className='px-4 mt-1 text-center text-white'>{description}</p>
                </div>
            </div>

            {/* cta */}
            <div className="px-4 absolute mx-auto my-0 lg:bottom-10 bottom-[6.5rem] flex items-center justify-center w-full">
                <Button
                    onClick={(e) => {e.preventDefault(); router.get(route('landing'))}}
                    className="button-animation bg-gradient-to-b from-[rgba(242,225,194,1)] 
                    from-1% to-[rgba(246,184,76,1)] to-90% rounded-md shadow-lg"
                >
                    <p
                        className="px-10 py-2 text-lg font-extrabold leading-none text-white uppercase font-FilsonProBold"
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