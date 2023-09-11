import React from "react";
import Auth from "@/Layouts/Backoffice/Auth";

const Login = () => {
    return <div>Login</div>;
};

export default Login;

Login.layout = (page) => <Auth children={page} title="Login CMS" />;
