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

export default function Edit({ attendance, users, categories, statuses }) {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data, setData, reset, errors, post } = useForm({
        user_id: attendance.data.user_id,
        date: attendance.data.date,
        clock_in: attendance.data.clock_in,
        clock_out: attendance.data.clock_out,
        clock_in_lat: attendance.data.clock_in_lat,
        clock_in_long: attendance.data.clock_in_long,
        category: attendance.data.category,
        status: attendance.data.status,
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
        post(route("cms.attendance.update", { attendance: attendance.data.slug }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // reset()
            },
        });
    };
    return (
        <Box m="20px">
            <Header title="Edit attendance" subtitle="Edit New attendance Data" />
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
                    <FormControl variant="filled" sx={{ gridColumn: "span 4" }} error={!!errors.user_id}>
                        <InputLabel id="user-label">Select User</InputLabel>
                        <Select
                            labelId="user-label"
                            id="user_id"
                            value={data.user_id}
                            name="user_id"
                            onChange={handleChange}
                            renderValue={(selected) => {
                                // Cari user berdasarkan user_id yang terpilih
                                const selectedUser = users.find(user => user.id === selected);
                                return selectedUser ? selectedUser.name : "Select User";
                            }}
                        >
                            {users && users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.name}
                        </MenuItem>
                    ))}
                        </Select>
                        {!!errors.user_id && (
                            <FormHelperText error={!!errors.user_id}>{errors.user_id}</FormHelperText>
                        )}
                    </FormControl>

                    {/* Select Category */}
                    <FormControl variant="filled" sx={{ gridColumn: "span 4" }} error={!!errors.category}>
                        <InputLabel id="marital-status-label">Category</InputLabel>
                        <Select
                            labelId="marital-status-label"
                            id="category"
                            value={data.category}
                            name="category"
                            onChange={handleChange}
                            renderValue={(selected) => selected || "Select Category"} // Menampilkan nilai terpilih
                        >
                            {Array.isArray(categories) && categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                        {!!errors.category && (
                            <FormHelperText>{errors.category}</FormHelperText>
                        )}
                    </FormControl>

                    {/* Select Category */}
                    <FormControl variant="filled" sx={{ gridColumn: "span 4" }} error={!!errors.status}>
                        <InputLabel id="marital-status-label">Status</InputLabel>
                        <Select
                            labelId="marital-status-label"
                            id="status"
                            value={data.status}
                            name="status"
                            onChange={handleChange}
                            renderValue={(selected) => selected || "Select status"} // Menampilkan nilai terpilih
                        >
                            {Array.isArray(statuses) && statuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                        {!!errors.status && (
                            <FormHelperText>{errors.status}</FormHelperText>
                        )}
                    </FormControl>

                    {/* Other Fields */}
                    <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Date"
                        onChange={handleChange}
                        name="date"
                        value={data.date}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.date}
                        helperText={errors.date}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="time"
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
                        type="time"
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

Edit.layout = (page) => <Backend children={page} title="Edit attendance" />;
