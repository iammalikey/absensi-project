import React, { useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import { Avatar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, } from "@mui/material";
import { router } from "@inertiajs/react";
import { getUrlSearchParameter } from "@/Utils/helper";
import ConfirmDeleteDialog from "@/Components/Backoffice/ConfirmDeleteDialog";

export default function Index({ divisions }) {
  // untuk edit
  const handleEdit = (id) => {
    router.get(route("cms.division.edit", { division: id }));
  };
  // untuk delete modal confirm delete
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [routeDelete, setRouteDelete] = useState('')
  const handleDelete = (id) => {
    setOpenConfirmDelete(true)
    setRouteDelete(route('cms.division.delete', { division: id }))
  }

  // pagination
  const handleChangePage = (event, newPage) => {
    divisions.meta.current_page < newPage + 1 ?
        router.get(divisions.links.next, {
            ...(getUrlSearchParameter("size") && {
              size: getUrlSearchParameter("size"),
            }),
          },
          { preserveScroll: true, preserveState: true }
        )
      :
        router.get(divisions.links.prev, {
            ...(getUrlSearchParameter("size") && {
              size: getUrlSearchParameter("size"),
            }),
          },
          { preserveScroll: true, preserveState: true }
        );
  };
  const handleChangeRowsPerPage = (event) => {
    router.get(route("cms.division.index"),
      { size: +event.target.value },
      { preserveScroll: true, preserveState: true }
    );
  };
  // -----------

  return (
    <Box m="20px">
      <Header title={`Division Management`} subtitle={`Manage Division`}></Header>
      <Box display="flex" justifyContent="start" mt="20px" gap="5px">
        <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={() => router.get(route("cms.division.create"))}
        >
            Add New Division
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {divisions.data.map((item, index) => (
              <TableRow 
              key={`${item.title} ${index}`}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
              >
                <TableCell>{item.title}</TableCell>
                <TableCell align="right" className="!space-x-2">
                  <Button onClick={() => handleEdit(item.slug)} color="neutral" variant="contained" className="mt-2">
                    Edit
                  </Button>
                  <Button onClick={() =>handleDelete(item.slug)} color="danger" variant="contained"  className='mt-2'>
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
        count={divisions.meta.total}
        rowsPerPage={divisions.meta.per_page}
        page={divisions.meta.current_page - 1}
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

Index.layout = (page) => <Backend children={page} title="Division Management" />;
