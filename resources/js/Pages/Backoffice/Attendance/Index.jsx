import React, { useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import {
    Avatar,
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

export default function Index({ attendances, user }) {
    // untuk edit
    const handleEdit = (id) => {
        router.get(route("cms.attendance.edit", { attendance: id }));
    };
    // untuk delete modal confirm delete
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [routeDelete, setRouteDelete] = useState("");
    const handleDelete = (id) => {
        setOpenConfirmDelete(true);
        setRouteDelete(route("cms.attendance.delete", { attendance: id }));
    };
    // -----------
    // pagination
    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        attendances.meta.current_page < newPage + 1
            ? router.get(
                  attendances.links.next,
                  {
                      ...(getUrlSearchParameter("size") && {
                          size: getUrlSearchParameter("size"),
                      }),
                  },
                  { preserveScroll: true, preserveState: true }
              )
            : router.get(
                  attendances.links.prev,
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
            route("cms.attendance.index"),
            { size: +event.target.value },
            { preserveScroll: true, preserveState: true }
        );
    };
    // -----------
    return (
        <Box m="20px">
            <Header title={`attendance Management`} subtitle={`Manage attendance`}></Header>
            <Box display="flex" justifyContent="start" mt="20px" gap="5px">
            {(user.role.includes("Super Admin") || user.role.includes("Human Resource")) && (
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick={() => router.get(route("cms.attendance.create"))}
                >
                    Create attendance
                </Button>
            )}
            </Box>
            <TableContainer sx={{ maxHeight: "70vh" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Clock In</TableCell>
                            <TableCell>Clock Out</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendances.data.map((attendance, index) => (
                            <TableRow
                                key={`${attendance.name} ${index}`}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>{attendance.user.name}</TableCell>
                                <TableCell>{attendance.clock_in}</TableCell>
                                <TableCell>{attendance.clock_out}</TableCell>
                                <TableCell>{attendance.category}</TableCell>
                                <TableCell>{attendance.status}</TableCell>
                                <TableCell align="center" className="!space-x-2">
                                    {(user.role.includes("Super Admin") || user.role.includes("Human Resource")) && (
                                    <Button
                                        color="neutral"
                                        variant="contained"
                                        onClick={() =>
                                            handleEdit(attendance.slug)
                                        }
                                        className="mt-2"
                                    >
                                        Edit
                                    </Button>
                                    )}
                                    {(user.role.includes("Super Admin")) && (
                                    <Button
                                        color="danger"
                                        variant="contained"
                                        onClick={() =>
                                            handleDelete(attendance.slug)
                                        }
                                        className="mt-2"
                                    >
                                        Delete
                                    </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 100]}
                component="div"
                count={attendances.meta.total}
                rowsPerPage={attendances.meta.per_page}
                page={attendances.meta.current_page - 1}
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

Index.layout = (page) => <Backend children={page} title="attendance Management" />;
