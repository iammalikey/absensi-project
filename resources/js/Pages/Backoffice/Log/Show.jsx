import { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from "@mui/material";
import { router } from "@inertiajs/react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";

export default function Detail({ log, selectedMonth }) {
    const [month, setMonth] = useState(selectedMonth || "");

    const availableMonths = ["2025-01", "2025-02", "2025-03"];

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
        router.get(route("cms.log.show", { user: log.id, month: event.target.value }));
    };

    console.log(log.attendances);

    return (
        <Box m="20px">
            <Header title="Attendance Detail" subtitle={`Details for ${log.name}`} />

            {/* Dropdown Filter Bulan */}
            <Box className="mb-4 flex items-center gap-2">
                <Select value={month} onChange={handleMonthChange} displayEmpty size="small">
                    <MenuItem value="">All Months</MenuItem>
                    {availableMonths.map((m) => (
                        <MenuItem key={m} value={m}>
                            {m}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* Tabel Kehadiran */}
            <TableContainer component={Paper} className="mt-4">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Clock In Lat</TableCell>
                            <TableCell>Clock In Long</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {log.attendances && log.attendances.length > 0 ? (
                            log.attendances.map((attendance, index) => (
                                <TableRow key={index}>
                                    <TableCell>{attendance.date}</TableCell>
                                    <TableCell>{attendance.clock_in_lat}</TableCell>
                                    <TableCell>{attendance.clock_in_long}</TableCell>
                                    <TableCell>{attendance.status}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">No attendance data available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

Detail.layout = (page) => <Backend children={page} title="Attendance Detail" />;
