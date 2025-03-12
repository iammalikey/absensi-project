import { usePage } from "@inertiajs/react";
import { Box, Typography } from "@mui/material";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";

export default function Detail({ log, selectedMonth }) {
    return (
        <Box m="20px">
            <Header title="Attendance Detail" subtitle={`Details for ${log.name} in ${selectedMonth}`} />

            <Box className="p-4 border rounded shadow-md">
                <Typography variant="h6">Employee: {log.name}</Typography>
                <Typography variant="h6">Total Attendance: {log.attendance_count}</Typography>
            </Box>
        </Box>
    );
}

Detail.layout = (page) => <Backend children={page} title="Attendance Detail" />;
