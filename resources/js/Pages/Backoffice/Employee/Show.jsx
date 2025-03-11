import { useForm } from "@inertiajs/react";
import { Box, Avatar, Typography, useMediaQuery, Container, Divider } from "@mui/material";
import React from "react";
import Header from "@/components/Backoffice/Header";
import Backend from "@/Layouts/Backoffice/Backend";

export default function Show({ employee }) {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data } = useForm({
        full_name: employee.data.full_name,
        phone: employee.data.phone,
        place_of_birth: employee.data.place_of_birth,
        date_of_birth: employee.data.date_of_birth,
        gender: employee.data.gender,
        marital_status: employee.data.marital_status,
        religion: employee.data.religion,
        blood_type: employee.data.blood_type,
        address: employee.data.address,
        postal_code: employee.data.postal_code,
        nik: employee.data.nik,
        npwp: employee.data.npwp,
        avatar: employee.data.user?.avatar,
        email: employee.data.user?.email,
        division: employee.data.division?.title,
    });

    return (
        <Box m="20px">
            <Header title="Employee Detail" subtitle={`${data.full_name}'s Detail`} />

            <Box display="flex" alignItems="center" gap="50px" mb="40px">
                <Avatar
                    sx={{
                        width: 200,
                        height: 200,
                    }}
                    src={data.avatar}
                />
                <Container maxWidth="md">
                    <Divider textAlign="left">Personal Data</Divider>
                    <Box display="grid" gridTemplateColumns="100px auto" gap="20px" mt="20px">
                        <Typography variant="subtitle2" color="textSecondary">
                            Name
                        </Typography>
                        <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.full_name}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Place of Birth
                        </Typography>
                        <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.place_of_birth}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Date of Birth
                        </Typography>
                        <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.date_of_birth}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Marital Status
                        </Typography>
                        <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.marital_status}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Religion
                        </Typography>
                        <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.religion}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Blood Type
                        </Typography>
                        <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.blood_type}</Typography>
                    </Box>
                </Container>
            </Box>
            <Divider textAlign="left">Identity & Address</Divider>
            <Box display="grid" gridTemplateColumns="100px auto" gap="20px" mt="20px">
                <Typography variant="subtitle2" color="textSecondary">
                    Division:
                </Typography>
                <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.division}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    Phone:
                </Typography>
                <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.phone}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    Email:
                </Typography>
                <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.email}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    Address :
                </Typography>
                <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.address}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    Postal Code :
                </Typography>
                <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.postal_code}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    NIK :
                </Typography>
                <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.nik}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    NPWP :
                </Typography>
                <Typography variant="body1">:&nbsp;&nbsp;&nbsp;&nbsp;{data.npwp}</Typography>
            </Box>

            {/* Layout Seperti Tabel Tanpa Garis */}
            
        </Box>
    );
}

Show.layout = (page) => <Backend children={page} title="Show Employee" />;
