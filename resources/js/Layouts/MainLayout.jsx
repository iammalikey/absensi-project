import React from "react";

const index = ({ children }) => {
    return (
        <div className="bg-image-blur relative min-h-screen">
            <div className="min-w-[320px] lg:max-w-[372px] max-w-[400px] min-h-screen  mx-auto bg-white relative shadow-2xl pb-5">
                <main>{children}</main>
            </div>
        </div>
    );
};

export default index;
