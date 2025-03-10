import React from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import { useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
} from "@mui/material";

export default function Create() {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    // Inertia Form Hook
    const { data, setData, reset, errors, post } = useForm({
        name: "",
        start_time: "",
        end_time: "",
    });

    // Handle Input Change
    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cms.shifts.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <Box m="20px">
            <Header title="Create Shift" subtitle="Create new shift schedule" />
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
                        label="Shift Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="time"
                        label="Start Time"
                        name="start_time"
                        value={data.start_time}
                        onChange={handleChange}
                        error={!!errors.start_time}
                        helperText={errors.start_time}
                        InputLabelProps={{ shrink: true }}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="time"
                        label="End Time"
                        name="end_time"
                        value={data.end_time}
                        onChange={handleChange}
                        error={!!errors.end_time}
                        helperText={errors.end_time}
                        InputLabelProps={{ shrink: true }}
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

// Layout untuk halaman Create Shift
Create.layout = (page) => <Backend children={page} title="Create Shift" />;
