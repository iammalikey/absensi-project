import { useForm } from "@inertiajs/react";
import { Box, Button, TextField, useMediaQuery, } from "@mui/material";
import React from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";

export default function Edit({ challenge }) {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data, setData, errors, post } = useForm({
        cta_title: challenge.data.cta_title,
        cta_link: challenge.data.cta_link,
        _method: "put",
    });

    const handleChange = (e) => {
        setData((prevData) => ({...prevData, [e.target.name]: e.target.value,}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cms.setting.update.challenge"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
            },
        });
    };

    return (
        <Box m="20px">
            <Header title={`Edit Setting`} subtitle={`Edit Setting ${challenge.data.name}`}/>
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
                        label="CTA Title"
                        onChange={handleChange}
                        name="cta_title"
                        value={data.cta_title}
                        error={!!errors.cta_title}
                        helperText={errors.cta_title}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="CTA Link"
                        onChange={handleChange}
                        name="cta_link"
                        value={data.cta_link}
                        error={!!errors.cta_link}
                        helperText={errors.cta_link}
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

Edit.layout = (page) => <Backend children={page} title="Edit Setting" />;
