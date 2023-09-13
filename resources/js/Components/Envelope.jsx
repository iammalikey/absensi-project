import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import anime from "animejs";

// images
const coverImage = "/assets/images/bg-landing.png";
const teamsBanner = "/assets/images/tim-versus.png";
const vindesImage = "/assets/images/vindes-image.png";
const campaignBanner = "/assets/images/campaign-banner.png";
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
            <header className="absolute left-0 w-full h-screen top-0 to-top to-bottom z-50 bg-cover" 
            style={{ backgroundImage: "url(/assets/images/bg-landing.png)" }}>
                {/* logo walls */}
                <div className="absolute z-30 top-4 right-4">
                    <img src={wallsLogo} alt="" className="w-12 h-auto" />
                </div>
                {/* campaign banner */}
                <div className="absolute top-20 mx-auto">
                    <img src={campaignBanner} alt="" className="w-72"/>
                </div>
                {/* vindes image */}
                <div className="absolute bottom-0 mx-auto">
                    <img src={vindesImage} alt="" className="w-full"/>
                </div>
                {/* teams banner */}
                <div className="absolute bottom-20 mx-auto">
                    <img src={teamsBanner} alt="" className="w-full"/>
                </div>
                {/* cta */}
                <div className="absolute mx-auto my-0 bottom-10 flex items-center justify-center w-full">
                    <Button
                        onClick={buttonHandler}
                        className="button-animation bg-gradient-to-b from-[rgba(242,225,194,1)] 
                        from-1% to-[rgba(246,184,76,1)] to-90% rounded-md shadow-lg"
                    >
                        <p className="uppercase text-white px-10 py-2 leading-none font-extrabold 
                        text-lg font-FilsonProBold">
                            ketuk untuk main
                        </p>
                    </Button>
                </div>
            </header>
        </>
    );
};

export default Envelope;
