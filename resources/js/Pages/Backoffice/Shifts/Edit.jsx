import React from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import { useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    useMediaQuery,
} from "@mui/material";

export default function Edit({ shift }) {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data, setData, errors, put } = useForm({
        name: shift.data.name,
        start_time: shift.data.start_time,
        end_time: shift.data.end_time,
        _method: "put",
    });

    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("cms.shifts.update", { shift: shift.data.id }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                console.log("Shift updated successfully!");
            },
        });
    };

    return (
        <Box m="20px">
            <Header
                title="Edit Shift"
                subtitle={`Edit shift ${shift.data.name}`}
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
                        label="Shift Name"
                        onChange={handleChange}
                        name="name"
                        value={data.name}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="time"
                        label="Start Time"
                        onChange={handleChange}
                        name="start_time"
                        value={data.start_time}
                        error={!!errors.start_time}
                        helperText={errors.start_time}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="time"
                        label="End Time"
                        onChange={handleChange}
                        name="end_time"
                        value={data.end_time}
                        error={!!errors.end_time}
                        helperText={errors.end_time}
                        sx={{ gridColumn: "span 2" }}
                    />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                        Update Shift
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

Edit.layout = (page) => <Backend children={page} title="Edit Shift" />;
