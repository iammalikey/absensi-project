import { useForm } from "@inertiajs/react";
import { Avatar, Box, Button, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, useMediaQuery, } from "@mui/material";
import React from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import { hasAnyPermission } from "@/Utils/helper";

export default function Edit({ klasemen }) {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data, setData, errors, post } = useForm({
        title: klasemen.data.title,
        score: klasemen.data.score,
        cta_title_instagram: klasemen.data.cta_title_instagram,
        cta_link_instagram: klasemen.data.cta_link_instagram,
        cta_title_tiktok: klasemen.data.cta_title_tiktok,
        cta_link_tiktok: klasemen.data.cta_link_tiktok,
        _method: "put",
    });

    const handleChange = (e) => {
        setData((prevData) => ({...prevData, [e.target.name]: e.target.value,}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cms.klasemen.update", { klasemen: klasemen.data.slug }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
            },
        });
    };

    return (
        <Box m="20px">
            <Header title={`Edit Klasemen`} subtitle={`Edit Klasemen ${klasemen.data.title}`}/>
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
                    <TextField
                        disabled={!hasAnyPermission(["klasemen management score"])}
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Score"
                        inputMode="numeric"
                        onChange={handleChange}
                        name="score"
                        value={data.score}
                        error={!!errors.score}
                        helperText={errors.score}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="CTA Title Instagram"
                        onChange={handleChange}
                        name="cta_title_instagram"
                        value={data.cta_title_instagram}
                        error={!!errors.cta_title_instagram}
                        helperText={errors.cta_title_instagram}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="CTA Title Tiktok"
                        onChange={handleChange}
                        name="cta_title_tiktok"
                        value={data.cta_title_tiktok}
                        error={!!errors.cta_title_tiktok}
                        helperText={errors.cta_title_tiktok}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        disabled={!hasAnyPermission(["klasemen management link"])}
                        fullWidth
                        variant="filled"
                        type="text"
                        label="CTA Link Instagram"
                        onChange={handleChange}
                        name="cta_link_instagram"
                        value={data.cta_link_instagram}
                        error={!!errors.cta_link_instagram}
                        helperText={errors.cta_link_instagram}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        disabled={!hasAnyPermission(["klasemen management link"])}
                        fullWidth
                        variant="filled"
                        type="text"
                        label="CTA Link Tiktok"
                        onChange={handleChange}
                        name="cta_link_tiktok"
                        value={data.cta_link_tiktok}
                        error={!!errors.cta_link_tiktok}
                        helperText={errors.cta_link_tiktok}
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

Edit.layout = (page) => <Backend children={page} title="Edit Klasemen" />;
