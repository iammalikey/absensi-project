import React, { useEffect, useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import { Avatar, Box, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EmployeeDetail() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/api/employees/${id}`)
            .then((response) => {
                setEmployee(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching employee data:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box m="20px">
            <Typography variant="h4" gutterBottom>
                Employee Detail
            </Typography>
            {employee ? (
                <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                        src={employee.user?.avatar}
                        sx={{ width: 80, height: 80 }}
                    />
                    <Box>
                        <Typography variant="h6">{employee.full_name}</Typography>
                        <Typography variant="body1">Email: {employee.user?.email || "-"}</Typography>
                        <Typography variant="body1">Division: {employee.division?.title || "-"}</Typography>
                        <Typography variant="body2">
                            Joined: {employee.created_at}
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <Typography>No employee data found.</Typography>
            )}
        </Box>
    );
}

EmployeeDetail.layout = (page) => <Backend children={page} title="Employee Detail" />;
