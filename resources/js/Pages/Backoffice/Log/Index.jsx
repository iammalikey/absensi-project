import React, { useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Button,
} from "@mui/material";
import { router } from "@inertiajs/react";

export default function Index({ attendances, selectedMonth, selectedName }) {
    const [month, setMonth] = useState(selectedMonth);
    const [name, setName] = useState(selectedName);

    const handleFilter = () => {
        router.get(route("cms.log.index"), { month, name });
    };

    const handleChangePage = (event, newPage) => {
        router.get(
            attendances.links[newPage + 1]?.url,
            {},
            { preserveScroll: true }
        );
    };

    return (
        <Box m="20px">
            <Header
                title="Laporan Absensi"
                subtitle="Laporan Bulanan Absensi"
            />

            {/* Filter Bulan & Nama */}
            <Box display="flex" alignItems="center" gap="10px" mb="20px">
                <TextField
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    label="Pilih Bulan  "
                />
                <TextField
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="Cari Berdasarkan Nama"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFilter}
                >
                    Filter
                </Button>
            </Box>

            <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                    (window.location.href = route("cms.log.export", {
                        month,
                        name,
                    }))
                }
            >
                Export to Excel
            </Button>

            {/* Tabel Attendance */}
            <TableContainer sx={{ maxHeight: "70vh" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Pegawai</TableCell>
                            <TableCell>Clock In</TableCell>
                            <TableCell>Clock Out</TableCell>
                            <TableCell>Radius (KM)</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendances.data.map((attendance) => (
                            <TableRow key={attendance.id}>
                                <TableCell>{attendance.user.name}</TableCell>
                                <TableCell>{attendance.clock_in}</TableCell>
                                <TableCell>
                                    {attendance.clock_out || "-"}
                                </TableCell>
                                <TableCell>
                                    {attendance.distance.toFixed(2)} KM
                                </TableCell>
                                <TableCell>{attendance.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={attendances.total}
                rowsPerPage={attendances.per_page}
                page={attendances.current_page - 1}
                onPageChange={handleChangePage}
            />
        </Box>
    );
}

Index.layout = (page) => <Backend children={page} title="Attendance Log" />;
