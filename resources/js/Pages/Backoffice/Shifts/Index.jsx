import React, { useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { router } from "@inertiajs/react";
import { getUrlSearchParameter } from "@/Utils/helper";
import ConfirmDeleteDialog from "@/Components/Backoffice/ConfirmDeleteDialog";

export default function Index({ shifts }) {
    // Untuk Edit
    const handleEdit = (id) => {
        router.get(route("cms.shifts.edit", { shift: id }));
    };

    // Untuk Delete (modal konfirmasi delete)
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [routeDelete, setRouteDelete] = useState("");
    const handleDelete = (id) => {
        setOpenConfirmDelete(true);
        setRouteDelete(route("cms.shifts.delete", { shift: id }));
    };

    // Pagination
    const handleChangePage = (event, newPage) => {
        shifts.meta.current_page < newPage + 1
            ? router.get(
                  shifts.links.next,
                  {
                      ...(getUrlSearchParameter("size") && {
                          size: getUrlSearchParameter("size"),
                      }),
                  },
                  { preserveScroll: true, preserveState: true }
              )
            : router.get(
                  shifts.links.prev,
                  {
                      ...(getUrlSearchParameter("size") && {
                          size: getUrlSearchParameter("size"),
                      }),
                  },
                  { preserveScroll: true, preserveState: true }
              );
    };

    const handleChangeRowsPerPage = (event) => {
        router.get(
            route("cms.shifts.index"),
            { size: +event.target.value },
            { preserveScroll: true, preserveState: true }
        );
    };

    return (
        <Box m="20px">
            <Header title="Shift Management" subtitle="Manage work shifts" />
            <Box display="flex" justifyContent="start" mt="20px" gap="5px">
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick={() => router.get(route("cms.shifts.create"))}
                >
                    Create Shift
                </Button>
            </Box>
            <TableContainer sx={{ maxHeight: "70vh" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shifts.data.map((shift, index) => (
                            <TableRow
                                key={`${shift.name} ${index}`}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>{shift.name}</TableCell>
                                <TableCell>{shift.start_time}</TableCell>
                                <TableCell>{shift.end_time}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        color="neutral"
                                        variant="contained"
                                        onClick={() => handleEdit(shift.id)}
                                        className="mt-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="danger"
                                        variant="contained"
                                        onClick={() => handleDelete(shift.id)}
                                        className="mt-2"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 100]}
                component="div"
                count={shifts.meta.total}
                rowsPerPage={shifts.meta.per_page}
                page={shifts.meta.current_page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <ConfirmDeleteDialog
                openConfirmDelete={openConfirmDelete}
                setOpenConfirmDelete={setOpenConfirmDelete}
                route={routeDelete}
            />
        </Box>
    );
}

Index.layout = (page) => <Backend children={page} title="Shift Management" />;
