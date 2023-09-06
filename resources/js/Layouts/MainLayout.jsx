import React from "react";

const index = ({ children }) => {
    return (
        <div className="max-w-sm mx-auto">
            <main>{children}</main>
        </div>
    );
};

export default index;
