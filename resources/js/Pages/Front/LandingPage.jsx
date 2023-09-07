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
            <header className="fixed max-w-sm to-top w-full h-full z-50">
                <h1 className="hidden">FEAST POP</h1>
                <div className="w-full h-full">
                    <img
                        src={coverImage}
                        alt="FEAST POP"
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
            </header>
            {/* ------ */}

            {/* banner */}
            <div className="w-full h-full relative overflow-y-hidden">
                <div className="w-full !overflow-hidden">
                    <img src={banner} alt="" className="w-full h-full" />
                </div>
            </div>

            {/* score */}
            <main className="mx-3 p-3 -translate-y-10 relative shadow-lg bg-white shadow-slate-200 rounded-xl">
                <div className="w-full mx-auto">
                    <img src={rectangle} alt="" />
                </div>
                <h2 className="uppercase text-center font-semibold my-4">
                    update klasemen
                </h2>
                <div className="grid grid-cols-2 justify-center text-center gap-5">
                    <div className="">
                        <div className="bg-slate-200 py-5 px-4 rounded-lg shadow-slate-300">
                            <p className="uppercase font-semibold text-xl text-yellow-500">
                                tim niat
                            </p>
                            <p className="text-6xl font-semibold text-yellow-500">
                                143
                            </p>
                            <p className="text-xl">orang</p>
                        </div>
                        <p className="opacity-70">telah bergabung <br /> Tim Niat</p>
                    </div>

                    <div className="">
                        <div className="bg-slate-200 py-5 px-4 rounded-lg shadow-slate-300">
                            <p className="uppercase font-semibold text-xl text-blue-500">
                                tim satset
                            </p>
                            <p className="text-6xl font-semibold text-blue-500">
                                120
                            </p>
                            <p className="text-xl">orang</p>
                        </div>
                        <p className="opacity-70">telah bergabung <br /> Tim Satset</p>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
};

export default LandingPage;
