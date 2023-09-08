import React, { useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import Envelope from "@/Components/Envelope";
import { Button } from "@mui/material";

// images
const banner = "/assets/images/banner.png";
const rectangle = "/assets/images/rectangle.png";

const LandingPage = () => {
    useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
    }, []);

    return (
        <MainLayout>
            <Envelope />

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
                        <p className="opacity-70">
                            telah bergabung <br /> Tim Niat
                        </p>
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
                        <p className="opacity-70">
                            telah bergabung <br /> Tim Satset
                        </p>
                    </div>
                </div>
            </main>

            <section className="mx-3 mb-6">
                <h2 className="uppercase text-center font-semibold mb-4">
                    kalo kamu masuk tim mana?
                </h2>
                <div className="grid grid-cols-2 gap-1.5 gap-y-5">
                    <Button className="!text-white !bg-orange-400 !rounded-lg shadow-md !text-lg">
                        gabung <br />
                        niat
                    </Button>
                    <Button className="!text-white !bg-orange-400 !rounded-lg shadow-md !text-lg">
                        gabung <br />
                        satset
                    </Button>
                    <Button className="col-span-2 !text-white !bg-blue-400 !rounded-lg shadow-md !text-lg">
                        ikuti challenge
                    </Button>
                </div>
            </section>
        </MainLayout>
    );
};

export default LandingPage;
