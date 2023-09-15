import React, { useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import { Avatar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, } from "@mui/material";
import { router } from "@inertiajs/react";
import { getUrlSearchParameter } from "@/Utils/helper";
import ConfirmDeleteDialog from "@/Components/Backoffice/ConfirmDeleteDialog";

export default function Index({ klasemens }) {
  // untuk edit
  const handleEdit = (id) => {
    router.get(route("cms.klasemen.edit", { klasemen: id }));
  };

  // pagination
  const handleChangePage = (event, newPage) => {
    klasemens.meta.current_page < newPage + 1 ?
        router.get(klasemens.links.next, {
            ...(getUrlSearchParameter("size") && {
              size: getUrlSearchParameter("size"),
            }),
          },
          { preserveScroll: true, preserveState: true }
        )
      :
        router.get(klasemens.links.prev, {
            ...(getUrlSearchParameter("size") && {
              size: getUrlSearchParameter("size"),
            }),
          },
          { preserveScroll: true, preserveState: true }
        );
  };
  const handleChangeRowsPerPage = (event) => {
    router.get(route("cms.klasemen.index"),
      { size: +event.target.value },
      { preserveScroll: true, preserveState: true }
    );
  };
  // -----------

  return (
    <Box m="20px">
      <Header title={`Klasemen Management`} subtitle={`Manage Klasemen`}></Header>
      <TableContainer sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>CTA Title</TableCell>
              <TableCell>CTA Link</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {klasemens.data.map((item, index) => (
              <TableRow 
              key={`${item.title} ${index}`}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
              >
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.score}</TableCell>
                <TableCell>{item.cta_title}</TableCell>
                <TableCell>{item.cta_link?? '-'}</TableCell>
                <TableCell align="right" className="!space-x-2">
                  <Button onClick={() => handleEdit(item.slug)} color="neutral" variant="contained" className="mt-2">
                    Edit
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
      count={klasemens.meta.total}
      rowsPerPage={klasemens.meta.per_page}
      page={klasemens.meta.current_page - 1}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

Index.layout = (page) => <Backend children={page} title="Klasemen Management" />;
