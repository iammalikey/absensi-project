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

export default function Index({ employees, user }) {
    // untuk edit
    const handleEdit = (id) => {
        router.get(route("cms.employee.edit", { employee: id }));
    };
    // untuk delete modal confirm delete
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [routeDelete, setRouteDelete] = useState("");
    const handleDelete = (id) => {
        setOpenConfirmDelete(true);
        setRouteDelete(route("cms.employee.delete", { employee: id }));
    };
    // -----------
    // pagination
    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        employees.meta.current_page < newPage + 1
            ? router.get(
                  employees.links.next,
                  {
                      ...(getUrlSearchParameter("size") && {
                          size: getUrlSearchParameter("size"),
                      }),
                  },
                  { preserveScroll: true, preserveState: true }
              )
            : router.get(
                  employees.links.prev,
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
            route("cms.employee.index"),
            { size: +event.target.value },
            { preserveScroll: true, preserveState: true }
        );
    };
    // -----------
    return (
        <Box m="20px">
            <Header
                title={`Kelola Pegawai`}
                subtitle={`Kelola Data Pegawai`}
            ></Header>
            <Box display="flex" justifyContent="start" mt="20px" gap="5px">
                {(user.role.includes("Super Admin") ||
                    user.role.includes("Human Resource")) && (
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        onClick={() => router.get(route("cms.employee.create"))}
                    >
                        Buat Data Pegawai Baru
                    </Button>
                )}
            </Box>
            <TableContainer sx={{ maxHeight: "70vh" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Nama</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Divisi</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.data.map((employee, index) => (
                            <TableRow
                                key={`${employee.name} ${index}`}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>
                                    <Avatar
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            cursor: "pointer",
                                        }}
                                        src={employee.user.avatar}
                                    />
                                </TableCell>
                                <TableCell>{employee.full_name}</TableCell>
                                <TableCell>{employee.user.email}</TableCell>
                                <TableCell>{employee.division.title}</TableCell>
                                <TableCell
                                    align="center"
                                    className="!space-x-2"
                                >
                                    {(user.role.includes("Super Admin") ||
                                        user.role.includes(
                                            "Human Resource"
                                        )) && (
                                        <Button
                                            color="neutral"
                                            variant="contained"
                                            onClick={() =>
                                                handleEdit(employee.slug)
                                            }
                                            className="mt-2"
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    {user.role.includes("Super Admin") && (
                                        <Button
                                            color="danger"
                                            variant="contained"
                                            onClick={() =>
                                                handleDelete(employee.slug)
                                            }
                                            className="mt-2"
                                        >
                                            Delete
                                        </Button>
                                    )}
                                    {(user.role.includes("Super Admin") ||
                                        user.role.includes("Human Resource") ||
                                        user.role.includes("Supervisor")) && (
                                        <Button
                                            color="info"
                                            variant="contained"
                                            onClick={() =>
                                                router.get(
                                                    route("cms.employee.show", {
                                                        employee: employee.id,
                                                    })
                                                )
                                            }
                                        >
                                            View Detail
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
                count={employees.meta.total}
                rowsPerPage={employees.meta.per_page}
                page={employees.meta.current_page - 1}
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

Index.layout = (page) => (
    <Backend children={page} title="Employee Management" />
);
