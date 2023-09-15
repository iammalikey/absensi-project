import React, { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import Envelope from "@/Components/Envelope";
import { Button } from "@mui/material";
import anime from "animejs";

// images
const banner = "/assets/images/banner-2.png";
// icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LandingPage = ({ tim_niat, tim_satset, challenge }) => {
    const [score, setScore] = useState({
        score: 50,
        niat: tim_niat.score,
        satset: tim_satset.score,
    });

    useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
    }, []);

    const handleBack = (e) => {
        e.preventDefault();

        window.scrollTo(0, 0);

        anime({
            targets: ".to-bottom",
            translateY: 0 + "%",
            duration: 1800,
        });
        document.body.style.overflow = "hidden";
    };

    return (
        <MainLayout>
            <Envelope />

            {/* banner */}
            <div className="w-full h-full relative">
                <div className="w-full !overflow-hidden">
                    <img src={banner} alt="" className="w-full h-full" />
                </div>
                <div className="absolute top-3 left-3" onClick={handleBack}>
                    <ArrowBackIcon
                        onClick={handleBack}
                        color="action"
                        fontSize="large"
                        sx={{
                            color: "white",
                            fontWeight: "900",
                            cursor: "pointer",
                        }}
                    />
                </div>
            </div>

            <main className="mx-3 p-3 -translate-y-10 relative shadow-lg bg-white shadow-slate-200 rounded-xl font-FilsonProBold">
                <div className="w-full mx-auto mb-4">
                    <div className="w-full h-6 bg-defaultBlue rounded-full overflow-hidden">
                        <div
                            className="h-6 bg-defaultOrange rounded-tl-full rounded-bl-full"
                            style={{
                                width:
                                    (tim_niat.score === 0 && tim_satset.score === 0) ?
                                    '50%'
                                    :
                                    Math.round((tim_niat.score /(tim_niat.score + tim_satset.score)) * 100) + "%",
                            }}
                        ></div>
                    </div>
                </div>

                <h2 className="uppercase text-center font-semibold mb-4">
                    update klasemen
                </h2>

                <div className="grid grid-cols-2 justify-center text-center gap-5">
                    <div className="">
                        <div className="overflow-auto no-scrollbar bg-gradient-to-b from-white to-slate-200 shadow-sm py-5 px-4 rounded-2xl shadow-slate-300 mb-4 h-[10rem] flex flex-col justify-between">
                            <p className="uppercase font-semibold text-xl text-defaultOrange">
                                {tim_niat.title}
                            </p>
                            <p
                                className={`${
                                    tim_niat.score >= 1000
                                        ? "text-4xl"
                                        : "text-6xl"
                                } font-semibold text-defaultOrange`}
                            >
                                {tim_niat.score}
                            </p>

                            <p className="text-xl">orang</p>
                        </div>
                        <p className="opacity-70 text-xs">
                            telah bergabung <br /> Tim Niat
                        </p>
                    </div>

                    <div className="">
                        <div className="overflow-auto no-scrollbar bg-gradient-to-b from-white to-slate-200 shadow-sm py-5 px-4 rounded-2xl shadow-slate-300 mb-4 h-[10rem] flex flex-col justify-between">
                            <p className="uppercase font-semibold text-xl text-defaultBlue">
                                {tim_satset.title}
                            </p>
                            <p
                                className={`${
                                    tim_satset.score >= 1000
                                        ? "text-4xl"
                                        : "text-6xl"
                                } font-semibold text-defaultBlue`}
                            >
                                {tim_satset.score}
                            </p>
                            <p className="text-xl">orang</p>
                        </div>
                        <p className="opacity-70 text-xs">
                            telah bergabung <br /> Tim Satset
                        </p>
                    </div>
                </div>
            </main>

            <section className="mx-3 mb-6">
                <h2 className="uppercase text-center font-semibold mb-4 font-FilsonProBold">
                    kalo kamu masuk tim mana?
                </h2>
                <div className="grid grid-cols-2 gap-1.5 gap-y-5">
                    <a href={tim_niat.cta_link}>
                        <Button className="!text-white !h-full !px-8 !bg-gradient-to-b !from-[#f3c558] !to-defaultOrange !rounded-lg !shadow-md !shadow-defaultOrange !text-lg !font-FilsonProBold">
                            {tim_niat.cta_title}
                        </Button>
                    </a>
                    <a href={tim_satset.cta_link}>
                        <Button className="!text-white !h-full !px-8 !bg-gradient-to-b !from-[#f3c558] !to-defaultOrange !rounded-lg !shadow-md !shadow-defaultOrange !text-lg !font-FilsonProBold">
                            {tim_satset.cta_title}
                        </Button>
                    </a>
                    <a href={challenge.cta_link} className="col-span-2 w-full bg-red-400 !rounded-lg">
                        <Button className="!w-full !text-white !bg-defaultBlue !shadow-sm !shadow-defaultBlue !text-lg !font-FilsonProBold">
                            {challenge.cta_title}
                        </Button>
                    </a>
                </div>
            </section>
        </MainLayout>
    );
};

export default LandingPage;
