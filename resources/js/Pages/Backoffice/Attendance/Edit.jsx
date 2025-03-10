import React from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import { useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    useMediaQuery,
    FormControl,
    FormHelperText,
    InputLabel,
    Select
} from "@mui/material";

export default function Edit({ attendance, users }) {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    // Form dengan metode PUT
    const { data, setData, errors, put } = useForm({
        users: attendance.data.users,
        date: attendance.data.date,
        clock_in: attendance.data.clock_in,
        clock_out: attendance.data.clock_out,
        clock_in_location: attendance.data.clock_in_location,
        status: attendance.data.status,
        _method: "put",
    });

    // Handle perubahan input
    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("cms.attendance.update", { attendance: attendance.id }), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    console.log(attendance);

    return (
        <Box m="20px">
            <Header title="Edit Attendance" subtitle={`Edit attendance for ${attendance.date}`} />
            <form onSubmit={handleSubmit}>
                <Box
                    display="grid"
                    gap="20px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 4",
                        },
                    }}
                >
                    {/* Employee (Read-Only) */}
                    <TextField
                        fullWidth
                        label="Employee Name"
                        type="text"
                        name="users"
                        InputLabelProps={{ shrink: true }}
                        value={data.users.name}
                        onChange={handleChange}
                        error={Boolean(errors.users)}
                        helperText={errors.users}
                        sx={{ gridColumn: "span 2" }}
                    />

                    {/* Date */}
                    <TextField
                        fullWidth
                        label="Date"
                        type="date"
                        name="date"
                        InputLabelProps={{ shrink: true }}
                        value={data.date}
                        onChange={handleChange}
                        error={Boolean(errors.date)}
                        helperText={errors.date}
                        sx={{ gridColumn: "span 2" }}
                    />

                    {/* Clock In */}
                    <TextField
                        fullWidth
                        label="Clock In"
                        type="time"
                        name="clock_in"
                        InputLabelProps={{ shrink: true }}
                        value={data.clock_in}
                        onChange={handleChange}
                        error={Boolean(errors.clock_in)}
                        helperText={errors.clock_in}
                        sx={{ gridColumn: "span 2" }}
                    />

                    {/* Clock Out */}
                    <TextField
                        fullWidth
                        label="Clock Out"
                        type="time"
                        name="clock_out"
                        InputLabelProps={{ shrink: true }}
                        value={data.clock_out}
                        onChange={handleChange}
                        error={Boolean(errors.clock_out)}
                        helperText={errors.clock_out}
                        sx={{ gridColumn: "span 2" }}
                    />

                    {/* Clock In Location */}
                    <TextField
                        fullWidth
                        label="Clock In Location"
                        name="clock_in_location"
                        value={data.clock_in_location}
                        onChange={handleChange}
                        error={Boolean(errors.clock_in_location)}
                        helperText={errors.clock_in_location}
                        sx={{ gridColumn: "span 4" }}
                    />

                    {/* Status (Dropdown) */}
                    <TextField
                        select
                        label="Status"
                        name="status"
                        value={data.status}
                        onChange={handleChange}
                        error={Boolean(errors.status)}
                        helperText={errors.status}
                        sx={{ gridColumn: "span 4" }}
                    >
                        <MenuItem value="Present">Present</MenuItem>
                        <MenuItem value="Absent">Absent</MenuItem>
                        <MenuItem value="Late">Late</MenuItem>
                    </TextField>
                </Box>

                {/* Submit Button */}
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                        Update Attendance
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

Edit.layout = (page) => <Backend children={page} title="Edit Attendance" />;
