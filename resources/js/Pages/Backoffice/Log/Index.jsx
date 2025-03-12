import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Box, Select, MenuItem, Typography } from "@mui/material";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";

export default function Index({ logs, selectedMonth }) {
    logs = Array.isArray(logs) ? logs : []; // Pastikan logs adalah array

    const [month, setMonth] = useState(selectedMonth);

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
        window.location.href = route("cms.log.index", { month: event.target.value });
    };

    console.log(logs)
    return (
        <Box m="20px">
            <Header title="Attendance Log" subtitle="Monthly Attendance Report" />

            <Box display="flex" justifyContent="space-between" mb="20px">
                <Typography variant="h6">Select Month:</Typography>
                <Select value={month} onChange={handleMonthChange}>
                    {["2025-01", "2025-02", "2025-03"].map((m) => (
                        <MenuItem key={m} value={m}>{m}</MenuItem>
                    ))}
                </Select>
            </Box>

            <table className="w-full border-collapse ">
                <thead>
                    <tr className=" ">
                        <th className="border p-2">Employee</th>
                        <th className="border p-2">Total Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id} className="border">
                            <td className="border p-2">
                                <Link href={route("cms.log.show", { user: log.id, month })} className="text-blue-500">
                                    {log.name}
                                </Link>
                            </td>
                            <td className="border p-2">{log.attendance_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
}

Index.layout = (page) => <Backend children={page} title="Attendance Logs" />;
