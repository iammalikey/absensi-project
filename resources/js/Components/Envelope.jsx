import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import anime from "animejs";

// images
const coverImage = "/assets/images/cover-image.png";
const teamsBanner = "/assets/images/teams-banner.png";

const Envelope = () => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        // document.body.style.overflow = "hidden";
    }, []);

    const buttonHandler = (e) => {
        e.preventDefault();
        anime({
            targets: ".to-top",
            translateY: -100 + "%",
            duration: 2800,
        });
        setOpen(false);
        document.body.style.overflow = "auto";
    };

    return (
        <header className="hidden absolute left-0 top-0 to-top w-full z-50">
            <h1 className="hidden">FEAST POP</h1>
            <div className="max-w-sm h-screen mx-auto relative">
                <div className="w-full h-full">
                    <img
                        src={coverImage}
                        alt="FEAST POP"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute bottom-44">
                    <img src={teamsBanner} alt="" />
                </div>
                <div className="absolute bottom-12 w-full flex justify-center">
                    <Button
                        onClick={buttonHandler}
                        className="button-animation bg-gradient-to-b from-[rgba(242,225,194,1)] from-1% to-[rgba(246,184,76,1)] to-90% rounded-md shadow-lg"
                    >
                        <p className="uppercase text-white px-[40px] py-[10px] leading-none font-extrabold text-lg font-FilsonProBlack">
                            ketik untuk main
                        </p>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Envelope;
