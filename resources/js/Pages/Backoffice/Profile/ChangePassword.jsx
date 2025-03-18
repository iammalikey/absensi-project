import React from "react";
import Backend from "@/Layouts/Backoffice/Backend.jsx";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import Header from "@/components/Backoffice/Header";
import { useForm, usePage } from "@inertiajs/react";

export default function ChangePassword() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { auth } = usePage().props;

    const { data, setData, reset, errors, put } = useForm({});

    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("cms.profile.password.update"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                reset();
            },
        });
    };

    return (
        <Box m="20px">
            <Header
                title={`Ganti Password`}
                subtitle={`Ganti Password ${auth.user.name}`}
            />
            <form onSubmit={handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 4",
                        },
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="password"
                        label="Password Lama"
                        onChange={handleChange}
                        name="old_password"
                        error={!!errors.old_password}
                        helperText={errors.old_password}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="password"
                        label="Password Saat Ini"
                        onChange={handleChange}
                        name="password"
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="password"
                        label="Password Konfirmasi"
                        onChange={handleChange}
                        name="password_confirmation"
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation}
                        sx={{ gridColumn: "span 4" }}
                    />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

ChangePassword.layout = (page) => (
    <Backend children={page} title="Change Password" />
);
