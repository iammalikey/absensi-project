import { useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useMediaQuery,
} from "@mui/material";
import React from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";

export default function Create({ users, categories, statuses }) {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data, setData, reset, errors, post } = useForm({
        user_id: "",
        date: "",
        clock_in: "",
        clock_out: "",
        clock_in_lat: "",
        clock_in_long: "",
        category: "",
        status: "",
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
    
        // Jika field adalah clock_in atau clock_out, ubah ke format Y-m-d H:i:s
        if (name === "clock_in" || name === "clock_out") {
            const date = new Date(value);
            value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:00`;
        }
    
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cms.attendance.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // reset()
            },
        });
    };
    return (
        <Box m="20px">
            <Header title="Create attendance" subtitle="Create New attendance Data" />
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
                    {/* Select User */}
                    <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                        <InputLabel>User</InputLabel>
                        <Select name="user_id" value={data.user_id} onChange={handleChange}>
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Select Division */}
                    <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                        <InputLabel>Category</InputLabel>
                        <Select name="category" value={data.category} onChange={handleChange}>
                            {categories.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Status */}
                    <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                        <InputLabel>Status</InputLabel>
                        <Select name="status" value={data.status} onChange={handleChange}>
                            {statuses.map((status) => (
                                <MenuItem key={status} value={status}>{status}</MenuItem>
                            ))}
                        </Select>
                        {errors.status && <p className="text-red-500">{errors.status}</p>}
                    </FormControl>

                    {/* Other Fields */}
                    <TextField
                        fullWidth
                        variant="filled"
                        type="datetime-local" // Ubah menjadi datetime-local
                        label="Clock In"
                        onChange={handleChange}
                        name="clock_in"
                        value={data.clock_in}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.clock_in}
                        helperText={errors.clock_in}
                        sx={{ gridColumn: "span 2" }}
                    />
                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="datetime-local" // Ubah menjadi datetime-local
                        label="Clock Out"
                        onChange={handleChange}
                        name="clock_out"
                        value={data.clock_out}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.clock_out}
                        helperText={errors.clock_out}
                        sx={{ gridColumn: "span 2" }}
                    />


                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="clock_in_lat"
                        onChange={handleChange}
                        name="clock_in_lat"
                        value={data.clock_in_lat}
                        error={!!errors.clock_in_lat}
                        helperText={errors.clock_in_lat}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="clock_in_long"
                        onChange={handleChange}
                        name="clock_in_long"
                        value={data.clock_in_long}
                        error={!!errors.clock_in_long}
                        helperText={errors.clock_in_long}
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

Create.layout = (page) => <Backend children={page} title="Create attendance" />;
