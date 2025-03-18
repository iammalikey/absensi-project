import { useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useMediaQuery,
} from "@mui/material";
import React from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";

export default function Create({
    users,
    divisions,
    maritalStatuses,
    religions,
}) {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data, setData, reset, errors, post } = useForm({
        user_id: "",
        division_id: "",
        full_name: "",
        place_of_birth: "",
        date_of_birth: "",
        blood_type: "",
        address: "",
        nik: "",
        npwp: "",
        postal_code: "",
        marital_status: "",
        religion: "",
    });

    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cms.employee.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // reset()
            },
        });
    };

    return (
        <Box m="20px">
            <Header
                title="Buat Data Pegawai Baru"
                subtitle="Data Pegawai Baru"
            />
            <form onSubmit={handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 4",
                        },
                    }}
                >
                    {/* Select User */}
                    <FormControl
                        fullWidth
                        variant="filled"
                        sx={{ gridColumn: "span 2" }}
                    >
                        <InputLabel>Pengguna</InputLabel>
                        <Select
                            name="user_id"
                            value={data.user_id}
                            onChange={handleChange}
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Select Division */}
                    <FormControl
                        fullWidth
                        variant="filled"
                        sx={{ gridColumn: "span 2" }}
                    >
                        <InputLabel>Divisi</InputLabel>
                        <Select
                            name="division_id"
                            value={data.division_id}
                            onChange={handleChange}
                        >
                            {divisions.map((division) => (
                                <MenuItem key={division.id} value={division.id}>
                                    {division.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Marital Status */}
                    <FormControl
                        fullWidth
                        variant="filled"
                        sx={{ gridColumn: "span 2" }}
                    >
                        <InputLabel>Status Perkawinan</InputLabel>
                        <Select
                            name="marital_status"
                            value={data.marital_status}
                            onChange={handleChange}
                        >
                            {maritalStatuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.marital_status && (
                            <p className="text-red-500">
                                {errors.marital_status}
                            </p>
                        )}
                    </FormControl>

                    {/* Religion */}
                    <FormControl
                        fullWidth
                        variant="filled"
                        sx={{ gridColumn: "span 2" }}
                    >
                        <InputLabel>Religion</InputLabel>
                        <Select
                            name="religion"
                            value={data.religion}
                            onChange={handleChange}
                        >
                            {religions.map((religion) => (
                                <MenuItem key={religion} value={religion}>
                                    {religion}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.religion && (
                            <p className="text-red-500">{errors.religion}</p>
                        )}
                    </FormControl>

                    {/* Other Fields */}
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Full Name"
                        onChange={handleChange}
                        name="full_name"
                        value={data.full_name}
                        error={!!errors.full_name}
                        helperText={errors.full_name}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Place of Birth"
                        onChange={handleChange}
                        name="place_of_birth"
                        value={data.place_of_birth}
                        error={!!errors.place_of_birth}
                        helperText={errors.place_of_birth}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Date of Birth"
                        onChange={handleChange}
                        name="date_of_birth"
                        value={data.date_of_birth}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.date_of_birth}
                        helperText={errors.date_of_birth}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Blood Type"
                        onChange={handleChange}
                        name="blood_type"
                        value={data.blood_type}
                        error={!!errors.blood_type}
                        helperText={errors.blood_type}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Address"
                        onChange={handleChange}
                        name="address"
                        multiline
                        rows={3}
                        value={data.address}
                        error={!!errors.address}
                        helperText={errors.address}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="NIK"
                        onChange={handleChange}
                        name="nik"
                        value={data.nik}
                        error={!!errors.nik}
                        helperText={errors.nik}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="NPWP"
                        onChange={handleChange}
                        name="npwp"
                        value={data.npwp}
                        error={!!errors.npwp}
                        helperText={errors.npwp}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Postal Code"
                        onChange={handleChange}
                        name="postal_code"
                        value={data.postal_code}
                        error={!!errors.postal_code}
                        helperText={errors.postal_code}
                        sx={{ gridColumn: "span 2" }}
                    />
                </Box>

                <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

Create.layout = (page) => <Backend children={page} title="Create Employee" />;
