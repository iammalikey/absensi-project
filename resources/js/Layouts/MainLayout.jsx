import React from "react";

const index = ({ children }) => {
    return (
        <div className="bg-image-blur">
            <div className="!overflow-x-hidden mx-auto max-w-sm relative shadow-2xl bg-white">
                <main>{children}</main>
            </div>
        </div>
    );
};

export default index;
