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

export default function Edit({
    employee,
    users,
    divisions,
    maritalStatuses,
    religions,
}) {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data, setData, errors, post } = useForm({
        user_id: employee.data.user_id,
        division_id: employee.data.division_id,
        full_name: employee.data.full_name,
        place_of_birth: employee.data.place_of_birth,
        date_of_birth: employee.data.date_of_birth,
        blood_type: employee.data.blood_type,
        address: employee.data.address,
        nik: employee.data.nik,
        npwp: employee.data.npwp,
        postal_code: employee.data.postal_code,
        marital_status: employee.data.marital_status,
        religion: employee.data.religion,
        _method: "put",
    });

    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cms.employee.update", { employee: employee.data.slug }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // reset()
            },
        });
    };

    return (
        <Box m="20px">
            <Header title="Edit Pegawai" subtitle={`Edit ${data.full_name}`} />
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
                        variant="filled"
                        sx={{ gridColumn: "span 4" }}
                        error={!!errors.user_id}
                    >
                        <InputLabel id="user-label">Pilih Pengguna</InputLabel>
                        <Select
                            labelId="user-label"
                            id="user_id"
                            value={data.user_id}
                            name="user_id"
                            onChange={handleChange}
                            renderValue={(selected) => {
                                // Cari user berdasarkan user_id yang terpilih
                                const selectedUser = users.find(
                                    (user) => user.id === selected
                                );
                                return selectedUser
                                    ? selectedUser.name
                                    : "Select User";
                            }}
                        >
                            {users &&
                                users.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                        </Select>
                        {!!errors.user_id && (
                            <FormHelperText error={!!errors.user_id}>
                                {errors.user_id}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {/* Select Division */}
                    <FormControl
                        variant="filled"
                        sx={{ gridColumn: "span 4" }}
                        error={!!errors.division_id}
                    >
                        <InputLabel id="user-label">Pilih Divisi</InputLabel>
                        <Select
                            labelId="user-label"
                            id="division_id"
                            value={data.division_id}
                            name="division_id"
                            onChange={handleChange}
                            renderValue={(selected) => {
                                // Cari user berdasarkan division_id yang terpilih
                                const selectedDivision = divisions.find(
                                    (division) => division.id === selected
                                );
                                return selectedDivision
                                    ? selectedDivision.title
                                    : "Select User";
                            }}
                        >
                            {divisions &&
                                divisions.map((division) => (
                                    <MenuItem
                                        key={division.id}
                                        value={division.id}
                                    >
                                        {division.title}
                                    </MenuItem>
                                ))}
                        </Select>
                        {!!errors.division_id && (
                            <FormHelperText error={!!errors.division_id}>
                                {errors.division_id}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {/* Marital Status */}
                    <FormControl
                        variant="filled"
                        sx={{ gridColumn: "span 4" }}
                        error={!!errors.marital_status}
                    >
                        <InputLabel id="marital-status-label">
                            Status Perkawinan
                        </InputLabel>
                        <Select
                            labelId="marital-status-label"
                            id="marital_status"
                            value={data.marital_status}
                            name="marital_status"
                            onChange={handleChange}
                            renderValue={(selected) =>
                                selected || "Select Marital Status"
                            } // Menampilkan nilai terpilih
                        >
                            {Array.isArray(maritalStatuses) &&
                                maritalStatuses.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                        </Select>
                        {!!errors.marital_status && (
                            <FormHelperText>
                                {errors.marital_status}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {/* Religion */}
                    <FormControl
                        variant="filled"
                        sx={{ gridColumn: "span 4" }}
                        error={!!errors.religion}
                    >
                        <InputLabel id="marital-status-label">Agama</InputLabel>
                        <Select
                            labelId="marital-status-label"
                            id="religion"
                            value={data.religion}
                            name="religion"
                            onChange={handleChange}
                            renderValue={(selected) =>
                                selected || "Select Marital Status"
                            } // Menampilkan nilai terpilih
                        >
                            {Array.isArray(religions) &&
                                religions.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                        </Select>
                        {!!errors.religion && (
                            <FormHelperText>{errors.religion}</FormHelperText>
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
                        label="Tempat Tanggal Lahir"
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
                        label="Tanggal Lahir"
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
                        label="Type Darah"
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
                        label="Alamat"
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

Edit.layout = (page) => <Backend children={page} title="Edit Employee" />;
