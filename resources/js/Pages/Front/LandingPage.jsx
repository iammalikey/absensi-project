import React, { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import Envelope from "@/Components/Envelope";
import { Button } from "@mui/material";

// images
const banner = "/assets/images/banner.png";
const rectangle = "/assets/images/rectangle.png";

// icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LandingPage = () => {
    const [score, setScore] = useState({
        score: 50,
    });

    useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
    }, []);

    const handleNiat = (e) => {
        e.preventDefault();
        // alert("niat");

        if (score.score === 100) {
            // alert("100");
            return;
        }

        setScore({
            ...score,
            score: score.score + 1,
        });
    };
    const handleSatset = (e) => {
        e.preventDefault();
        // alert("satset");
        if (score.score === 0) {
            // alert("100");
            return;
        }

        setScore({
            ...score,
            score: score.score - 1,
        });
    };
    const handleBack = () => {};

    return (
        <MainLayout>
            <Envelope />

            {/* banner */}
            <div className="w-full h-full relative overflow-y-hidden">
                <div className="w-full !overflow-hidden">
                    <img src={banner} alt="" className="w-full h-full" />
                </div>
                <div className="absolute top-3 left-3" onClick={handleBack}>
                    <ArrowBackIcon
                        color="action"
                        fontSize="large"
                        sx={{ color: "white", fontWeight: "900" }}
                    />
                </div>
            </div>

            {/* score */}
            <main className="mx-3 p-3 -translate-y-10 relative shadow-lg bg-white shadow-slate-200 rounded-xl font-FilsonProBold">
                <div className="w-full mx-auto mb-4">
                    <div className="w-full h-6 bg-[#99b3ff] rounded-full overflow-hidden">
                        <div
                            className="h-6 bg-[#ffdf80] rounded-tl-full rounded-bl-full"
                            style={{ width: score.score + "%" }}
                        ></div>
                    </div>
                </div>
                <h2 className="uppercase text-center font-semibold mb-4">
                    update klasemen
                </h2>
                <div className="grid grid-cols-2 justify-center text-center gap-5">
                    <div className="">
                        <div className="bg-slate-200 py-5 px-4 rounded-lg shadow-slate-300 mb-4">
                            <p className="uppercase font-semibold text-xl text-yellow-500">
                                tim niat
                            </p>
                            <p className="text-6xl font-semibold text-yellow-500">
                                {score.score}
                            </p>
                            <p className="text-xl">orang</p>
                        </div>
                        <p className="opacity-70 text-xs">
                            telah bergabung <br /> Tim Niat
                        </p>
                    </div>

                    <div className="">
                        <div className="bg-slate-200 py-5 px-4 rounded-lg shadow-slate-300 mb-4">
                            <p className="uppercase font-semibold text-xl text-blue-500">
                                tim satset
                            </p>
                            <p className="text-6xl font-semibold text-blue-500">
                                {score.score}
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
                    <Button
                        onClick={handleNiat}
                        className="!text-white !bg-orange-400 !rounded-lg shadow-md !text-lg !font-FilsonProBold"
                    >
                        gabung <br />
                        niat
                    </Button>
                    <Button
                        onClick={handleSatset}
                        className="!text-white !bg-orange-400 !rounded-lg shadow-md !text-lg !font-FilsonProBold"
                    >
                        gabung <br />
                        satset
                    </Button>
                    <Button className="col-span-2 !text-white !bg-blue-400 !rounded-lg shadow-md !text-lg !font-FilsonProBold">
                        ikuti challenge
                    </Button>
                </div>
            </section>
        </MainLayout>
    );
};

export default LandingPage;
