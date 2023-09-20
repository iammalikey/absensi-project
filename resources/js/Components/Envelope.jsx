import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import anime from "animejs";

// images
const coverImage = "/assets/images/bg-landing.png";
const teamsBanner = "/assets/images/tim-versus-min.png";
// const vindesImage = "/assets/images/vindes-image.png";
const vindesCampaignImage = "/assets/images/vindes-campaign-banner.webp";
// const campaignBanner = "/assets/images/campaign-banner.png";
const wallsLogo = "/assets/images/walls-logo.png";

const Envelope = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, []);

    const buttonHandler = (e) => {
        e.preventDefault();
        anime({
            targets: ".to-top",
            translateY: -100 + "%",
            duration: 2800,
        });
        document.body.style.overflow = "auto";
    };

    return (
        <>
            <header
                className="absolute top-0 left-0 z-50 w-full h-screen overflow-hidden bg-cover to-top to-bottom"
                style={{
                    backgroundImage: `url(${coverImage})`,
                }}
            >
                {/* logo walls */}
                <div className="absolute z-30 top-4 right-4">
                    <img src={wallsLogo} alt="" className="w-16 h-auto md:w-24 lg:w-16" />
                </div>

                {/* vindes image */}
                <div className="absolute bottom-0 mx-auto lg:bottom-0">
                    <img src={vindesCampaignImage} alt="" className="w-full" />
                </div>

                {/* teams banner */}
                <div className="absolute mx-auto lg:bottom-24 bottom-36">
                    <img src={teamsBanner} alt="" className="w-full" />
                </div>

                {/* cta */}
                <div className="absolute mx-auto my-0 lg:bottom-10 bottom-[6.5rem] flex items-center justify-center w-full">
                    <Button
                        onClick={buttonHandler}
                        className="button-animation bg-gradient-to-b from-[rgba(242,225,194,1)] 
                        from-1% to-[rgba(246,184,76,1)] to-90% rounded-md shadow-lg"
                    >
                        <p
                            className="px-10 py-2 text-lg font-extrabold leading-none text-white uppercase font-FilsonProBold"
                        >
                            ketuk untuk main
                        </p>
                    </Button>
                </div>
            </header>
        </>
    );
};

export default Envelope;
