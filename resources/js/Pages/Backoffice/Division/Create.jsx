import { useForm } from "@inertiajs/react";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";

export default function Create() {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data, setData, reset, errors, post } = useForm({
        title: "",
    });
    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cms.division.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                // reset()
            },
        });
    };

    return (
        <Box m="20px">
            <Header
                title={`Buat Data Divisi Baru`}
                subtitle={`Data Divisi Baru`}
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
                        type="text"
                        label="Nama Divisi"
                        onChange={handleChange}
                        name="title"
                        value={data.title}
                        error={!!errors.title}
                        helperText={errors.title}
                        sx={{ gridColumn: "span 2" }}
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

Create.layout = (page) => (
    <Backend children={page} title="Create New Data Division" />
);
