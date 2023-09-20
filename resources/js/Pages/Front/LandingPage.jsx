import React, { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import Envelope from "@/Components/Envelope";
import { Box, Button, Tab, Tabs } from "@mui/material";
import anime from "animejs";

// images
const banner = "/assets/images/banner-2.webp";
const wallsLogo = "/assets/images/walls-logo.png";
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

    // tab action
    const [value, setValue] = useState(0);
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainLayout>
            <Envelope />

            {/* banner */}
            <div className="relative w-full h-full">
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
                {/* logo walls */}
                <div className="absolute top-3 right-3">
                    <img src={wallsLogo} alt="" className="w-12 h-auto" />
                </div>
            </div>

            <main className="relative p-3 mx-3 -translate-y-10 bg-white shadow-lg shadow-slate-200 rounded-xl font-FilsonProBold">
                <div className="w-full mx-auto mb-4">
                    <div className="w-full h-6 overflow-hidden rounded-full bg-defaultBlue">
                        <div
                            className="h-6 rounded-tl-full rounded-bl-full bg-defaultOrange"
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

                {/* <h2 className="mb-4 font-semibold text-center uppercase">
                    update klasemen
                </h2> */}

                <div className="grid justify-center grid-cols-2 gap-5 text-center">
                    <div className="">
                        <div className="overflow-auto no-scrollbar bg-gradient-to-b from-white to-slate-200 shadow-sm py-5 px-4 rounded-2xl shadow-slate-300 mb-4 h-[10rem] flex flex-col justify-between">
                            <p className="text-xl font-semibold uppercase text-defaultOrange">
                                {tim_niat.title}
                            </p>
                            <p
                                className={`
                                ${tim_niat.score < 1000 && "text-6xl"} 
                                ${tim_niat.score >= 1000 && "text-3xl"}
                                font-semibold text-defaultOrange
                            `}
                            >
                                {tim_niat.score}
                            </p>

                            <p className="text-xl">orang</p>
                        </div>
                        <p className="text-xs text-gray-500 opacity-70">
                            telah mendukung <br /> <span className="uppercase">{tim_niat.title}</span>
                        </p>
                    </div>

                    <div className="">
                        <div className="overflow-auto no-scrollbar bg-gradient-to-b from-white to-slate-200 shadow-sm py-5 px-4 rounded-2xl shadow-slate-300 mb-4 h-[10rem] flex flex-col justify-between">
                            <p className="text-xl font-semibold uppercase text-defaultBlue">
                                {tim_satset.title}
                            </p>
                            <p
                                className={`
                                    ${tim_satset.score < 1000 && "text-6xl"} 
                                    ${tim_satset.score >= 1000 && "text-3xl"}
                                    font-semibold text-defaultBlue
                                `}
                            >
                                {tim_satset.score}
                            </p>
                            <p className="text-xl">orang</p>
                        </div>
                        <p className="text-xs text-gray-500 opacity-70">
                            telah mendukung <br /> <span className="uppercase">{tim_satset.title}</span>
                        </p>
                    </div>
                </div>
            </main>

            <section className="px-3 mb-6">
                <h1 className="font-semibold text-center text-gray-800 uppercase font-FilsonProBold">
                    kamu masuk tim mana?
                </h1>
                <Box sx={{ borderBottom: 2, borderColor: 'divider', mb: 2 }}>
                    <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    aria-label="basic tabs example"
                    centered
                    sx={{
                        '& div': {
                            overflow: 'auto',
                            display: 'flex',
                            alignItems: 'end',
                            width: '100%',
                            pt:1,
                            '& .MuiTabs-indicator': {
                                backgroundColor: value === 0 ? '#efaf1d':'#1a89c2',
                            },
                        },
                    }}>
                        <Tab label="Ikut Di Instagram" id="tab-0" aria-controls="tabpanel-0" className={`${value === 0 && '!bg-white !rounded-tr-lg tab-shadow-ff !text-gray-700'} !w-1/2 !grow !font-bold !text-gray-300 !text-xs !min-h-0 !h-9`} />
                        <Tab label="Ikut Di Tiktok" id="tab-1" aria-controls="tabpanel-1" className={`${value === 1 && '!bg-white !rounded-tl-lg tab-shadow-ff !text-gray-700'} !w-1/2 !grow !font-bold !text-gray-300 !text-xs !min-h-0 !h-9`} />
                    </Tabs>
                </Box>
                <div
                    role="tabpanel"
                    hidden={value !== 0}
                    id={`tabpanel-${0}`}
                    aria-labelledby={`tab-${0}`}
                >
                    {value === 0 && (        
                        <div className="grid grid-cols-2 gap-1.5 gap-y-5">
                            <a href={tim_niat.cta_link_instagram} tabIndex={-1}>
                                <Button className="!text-white !w-full !h-full !py-2 !bg-gradient-to-b !from-[#f3c558] !to-defaultOrange !rounded-lg !shadow-md !shadow-defaultOrange !text-sm !font-FilsonProBold">
                                    {tim_niat.cta_title_instagram}
                                </Button>
                            </a>
                            <a href={tim_satset.cta_link_instagram} tabIndex={-1}>
                                <Button className="!text-white !w-full !h-full !py-2 !bg-gradient-to-b !from-[#67b0d7] !to-[#1a89c2] !rounded-lg !shadow-md !shadow-[#1a89c2] !text-sm !font-FilsonProBold">
                                    {tim_satset.cta_title_instagram}
                                </Button>
                            </a>
                        </div>
                    )}
                </div>
                <div
                    role="tabpanel"
                    hidden={value !== 1}
                    id={`tabpanel-${1}`}
                    aria-labelledby={`tab-${1}`}
                >
                    {value === 1 && (        
                        <div className="grid grid-cols-2 gap-1.5 gap-y-5">
                            <a href={tim_niat.cta_link_tiktok} tabIndex={-1}>
                                <Button className="!text-white !w-full !h-full !py-2 !bg-gradient-to-b !from-[#f3c558] !to-defaultOrange !rounded-lg !shadow-md !shadow-defaultOrange !text-sm !font-FilsonProBold">
                                    {tim_niat.cta_title_tiktok}
                                </Button>
                            </a>
                            <a href={tim_satset.cta_link_tiktok} tabIndex={-1}>
                                <Button className="!text-white !w-full !h-full !py-2 !bg-gradient-to-b !from-[#67b0d7] !to-[#1a89c2] !rounded-lg !shadow-md !shadow-[#1a89c2] !text-sm !font-FilsonProBold">
                                    {tim_satset.cta_title_tiktok}
                                </Button>
                            </a>
                        </div>
                    )}
                </div>

                <h2 className="font-semibold leading-5 text-center text-gray-800 uppercase mt-7 font-FilsonProBold">
                    DAPATKAN HADIAH <br /> SENILAI JUTAAN RUPIAH
                </h2>
                
                <div className="mt-5">
                    <a href={challenge.cta_link} className="w-full bg-red-400 !rounded-lg" tabIndex={-1}>
                        <Button className="!text-white !w-full !h-full !py-2 !bg-gradient-to-b !from-[#f64242] !to-[#fe0506] !rounded-lg !shadow-md !shadow-[#fe0506] !text-sm !font-FilsonProBold">
                            {challenge.cta_title}
                        </Button>
                    </a>
                </div>
            </section>
        </MainLayout>
    );
};

export default LandingPage;
