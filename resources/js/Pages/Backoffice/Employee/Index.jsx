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

export default function Index({ employees }) {
    // untuk edit
    const handleEdit = (id) => {
        router.get(route("cms.access.employee.edit", { employee: id }));
    };
    // untuk delete modal confirm delete
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [routeDelete, setRouteDelete] = useState("");
    const handleDelete = (id) => {
        setOpenConfirmDelete(true);
        setRouteDelete(route("cms.access.employee.delete", { employee: id }));
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
            route("cms.access.employee.index"),
            { size: +event.target.value },
            { preserveScroll: true, preserveState: true }
        );
    };
    // -----------

    return (
        <Box m="20px">
            <Header title={`Employee Management`} subtitle={`Manage Employee`}></Header>
            <Box display="flex" justifyContent="start" mt="20px" gap="5px">
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick={() => router.get(route("cms.access.employee.create"))}
                >
                    Create employee
                </Button>
            </Box>
            <TableContainer sx={{ maxHeight: "70vh" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Division</TableCell>
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
                                <TableCell align="center" className="!space-x-2">
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
                                    <Button
                                        color="info"
                                        variant="contained"
                                        onClick={() =>
                                            router.get(route("cms.employee.show", { employee: employee.id }))
                                        }
                                    >
                                        View Detail
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

Index.layout = (page) => <Backend children={page} title="Employee Management" />;
