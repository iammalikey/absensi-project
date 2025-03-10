import React, { useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useForm } from "@inertiajs/react";

export default function Create({ users, shifts }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: "",
        shift_id: "",
        date: "",
        clock_in: "",
        clock_out: "",
        clock_in_location:"",
        status: "",
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
        post(route("cms.attendance.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <Box m="20px">
            <Header title="Create Attendance" subtitle="Add a new attendance record" />
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap="20px">
                    <TextField
                        select
                        label="Employee"
                        value={data.user_id}
                        onChange={(e) => setData("user_id", e.target.value)}
                        error={Boolean(errors.user_id)}
                        helperText={errors.user_id}
                    >
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.name}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No users available</MenuItem>
                        )}
                    </TextField>

                    <TextField
                        select
                        label="Shift"
                        value={data.shift_id}
                        onChange={(e) => setData("shift_id", e.target.value)}
                        error={Boolean(errors.shift_id)}
                        helperText={errors.shift_id}
                    >
                        {shifts && shifts.length > 0 ? (
                            shifts.map((shift) => (
                                <MenuItem key={shift.id} value={shift.id}>
                                    {shift.name}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No users available</MenuItem>
                        )}
                    </TextField>

                    <TextField
                        label="Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={data.date}
                        onChange={(e) => setData("date", e.target.value)}
                        error={Boolean(errors.date)}
                        helperText={errors.date}
                    />

                    <TextField
                        label="Clock In"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        value={data.clock_in}
                        onChange={(e) => setData("clock_in", e.target.value)}
                        error={Boolean(errors.clock_in)}
                        helperText={errors.clock_in}
                    />

                    <TextField
                        label="Clock Out"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        value={data.clock_out}
                        onChange={(e) => setData("clock_out", e.target.value)}
                        error={Boolean(errors.clock_out)}
                        helperText={errors.clock_out}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Clock In Location"
                        name="clock_in_location"
                        value={data.clock_in_location}
                        onChange={handleChange}
                        error={!!errors.clock_in_location}
                        helperText={errors.clock_in_location}
                        sx={{ gridColumn: "span 4" }}
                    />

                    <TextField
                        select
                        label="Status"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        error={Boolean(errors.status)}
                        helperText={errors.status}
                    >
                        <MenuItem value="Present">Present</MenuItem>
                        <MenuItem value="Absent">Absent</MenuItem>
                        <MenuItem value="Late">Late</MenuItem>
                    </TextField>

                    <Button type="submit" color="primary" variant="contained" disabled={processing}>
                        Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

Create.layout = (page) => <Backend children={page} title="Create Attendance" />;
