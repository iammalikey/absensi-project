import React from "react";

const index = ({ children }) => {
    return (
        <div className="!overflow-x-hidden mx-auto max-w-sm h-screen relative">
            <main>{children}</main>
        </div>
    );
};

export default index;
