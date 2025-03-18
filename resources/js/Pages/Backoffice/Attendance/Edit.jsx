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
        clock_in: attendance.data.clock_in,
        clock_out: attendance.data.clock_out,
        clock_in_lat: attendance.data.clock_in_lat,
        clock_in_long: attendance.data.clock_in_long,
        category: attendance.data.category,
        status: attendance.data.status,
        _method: "put",
    });

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Jika field adalah clock_in atau clock_out, ubah ke format Y-m-d H:i:s
        if (name === "clock_in" || name === "clock_out") {
            const date = new Date(value);
            value = `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(
                2,
                "0"
            )} ${String(date.getHours()).padStart(2, "0")}:${String(
                date.getMinutes()
            ).padStart(2, "0")}:00`;
        }

        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(
            route("cms.attendance.update", {
                attendance: attendance.data.slug,
            }),
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    // reset()
                },
            }
        );
    };
    return (
        <Box m="20px">
            <Header title="Edit Absensi" subtitle="Edit Data Absensi Baru" />
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
                    <FormControl
                        variant="filled"
                        sx={{ gridColumn: "span 4" }}
                        error={!!errors.user_id}
                    >
                        <InputLabel id="user-label">Select User</InputLabel>
                        <Select
                            labelId="user-label"
                            id="user_id"
                            value={data.user_id}
                            name="user_id"
                            onChange={handleChange}
                            renderValue={(selected) => {
                                // Cari user berdasarkan user_id yang terpilih
                                const selectedUser = users.find(
                                    (user) => user.id === selected
                                );
                                return selectedUser
                                    ? selectedUser.name
                                    : "Pilih Pengguna";
                            }}
                        >
                            {users &&
                                users.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                        </Select>
                        {!!errors.user_id && (
                            <FormHelperText error={!!errors.user_id}>
                                {errors.user_id}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {/* Select Category */}
                    <FormControl
                        variant="filled"
                        sx={{ gridColumn: "span 4" }}
                        error={!!errors.category}
                    >
                        <InputLabel id="marital-status-label">
                            Category
                        </InputLabel>
                        <Select
                            labelId="marital-status-label"
                            id="category"
                            value={data.category}
                            name="category"
                            onChange={handleChange}
                            renderValue={(selected) =>
                                selected || "Select Category"
                            } // Menampilkan nilai terpilih
                        >
                            {Array.isArray(categories) &&
                                categories.map((category) => (
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
                    <FormControl
                        variant="filled"
                        sx={{ gridColumn: "span 4" }}
                        error={!!errors.status}
                    >
                        <InputLabel id="marital-status-label">
                            Status
                        </InputLabel>
                        <Select
                            labelId="marital-status-label"
                            id="status"
                            value={data.status}
                            name="status"
                            onChange={handleChange}
                            renderValue={(selected) =>
                                selected || "Select status"
                            } // Menampilkan nilai terpilih
                        >
                            {Array.isArray(statuses) &&
                                statuses.map((status) => (
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
                        type="datetime-local"
                        label="Clock In"
                        onChange={handleChange}
                        name="clock_in"
                        value={
                            data.clock_in
                                ? data.clock_in.replace(" ", "T").slice(0, 16)
                                : ""
                        } // Konversi untuk tampilan input
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.clock_in}
                        helperText={errors.clock_in}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="datetime-local"
                        label="Clock Out"
                        onChange={handleChange}
                        name="clock_out"
                        value={
                            data.clock_out
                                ? data.clock_out.replace(" ", "T").slice(0, 16)
                                : ""
                        } // Konversi untuk tampilan input
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
