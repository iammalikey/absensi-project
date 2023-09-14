import Header from "@/Components/Backoffice/Header";
import Backend from "@/Layouts/Backoffice/Backend";
import { usePage } from "@inertiajs/react";
import { Box, Button, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import React from "react";

const Edit = ({ klasemen }) => {
    // console.log(klasemen);
    const user = usePage().props.auth.user;

    return (
        <Box sx={{ m: "20px" }}>
            <Header title={`Welcome Back ${user.name}`} subtitle={`Your Role ${user.role.map((role, index) => role.name)}`}></Header>

            <Typography variant="h2" sx={{ fontSize: 25 }} gutterBottom>Klasemen Edit</Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} container>
                <TextField id="outlined-required" label="Title" defaultValue={klasemen.title} color="success" required fullWidth />
                <TextField id="outlined-required" label="Score" defaultValue={klasemen.score} color="success" required fullWidth />
                <TextField id="outlined-required" label="CTA Title" defaultValue={klasemen.cta_title} color="success" required fullWidth />
                <TextField id="outlined-required" label="CTA Link" defaultValue={klasemen.cta_link == null ? "Null" : ""} color="success" required fullWidth />
            </Box>

            <Tooltip title="Save">
                <Button variant="contained" sx={{ backgroundColor: 'blue', marginTop: '20px', float: 'right'}}>Save</Button>
            </Tooltip>
        </Box>
    );
};

export default Edit;

Edit.layout = (page) => <Backend children={page} title="Klasemen CMS" />;
