import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import { Button } from "@mui/material";
import anime from "animejs";

// images
const coverImage = "/assets/images/cover-image.png";
const banner = "/assets/images/banner.png";
const rectangle = "/assets/images/rectangle.png";

const LandingPage = () => {
    const buttonHandler = () => {
        anime({
            targets: ".to-top",
            translateY: -100 + "%",
            duration: 1800,
        });
    };

    return (
        <MainLayout>
            {/* semacam amplop */}
            <section className="absolute top-0 left-0 to-top w-full h-screen z-50">
                <div className="w-full h-full">
                    <img
                        src={coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute bottom-12 w-full flex justify-center">
                    <Button
                        onClick={buttonHandler}
                        className="button-animation bg-gradient-to-b from-[rgba(242,225,194,1)] from-1% to-[rgba(246,184,76,1)] to-90% rounded-md shadow-lg"
                    >
                        <p className="uppercase text-white px-[40px] py-[10px] leading-none font-extrabold text-lg">
                            tap to start
                        </p>
                    </Button>
                </div>
            </section>
            {/* ------ */}

            {/* banner */}
            <section className="w-full h-full relative overflow-y-hidden">
                <div className="w-full !overflow-hidden">
                    <img src={banner} alt="" className="w-full h-full" />
                </div>

                <div className="absolute bottom-0">
                    <div className="w-11/12 mx-auto border-[10px] border-white bg-white rounded-t-lg">
                        <img src={rectangle} alt="" />
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default LandingPage;
