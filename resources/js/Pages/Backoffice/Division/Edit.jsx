import { useForm } from "@inertiajs/react";
import { Box, Button, TextField, useMediaQuery, } from "@mui/material";
import React from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import { hasAnyPermission } from "@/Utils/helper";

export default function Edit({ division }) {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data, setData, errors, post } = useForm({
        title: division.data.title,
        _method: "put",
    });

    const handleChange = (e) => {
        setData((prevData) => ({...prevData, [e.target.name]: e.target.value,}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cms.division.update", { division: division.data.slug }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
            },
        });
    };

    return (
        <Box m="20px">
            <Header title={`Edit Division`} subtitle={`Edit Division ${division.data.title}`}/>
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
                        label="Title"
                        onChange={handleChange}
                        name="title"
                        value={data.title}
                        error={!!errors.title}
                        helperText={errors.title}
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

Edit.layout = (page) => <Backend children={page} title="Edit Division" />;
