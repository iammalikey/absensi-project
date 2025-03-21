import { useForm } from "@inertiajs/react";
import {
    Avatar,
    Box,
    Button,
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import Backend from "@/Layouts/Backoffice/Backend";
import Header from "@/components/Backoffice/Header";
import { createUrlImage } from "@/Utils/helper";

export default function Create({ roles }) {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data, setData, reset, errors, post } = useForm({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: [],
    });
    // buat tampung file avatar
    const [avatarUrl, setAvatarUrl] = useState("");

    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeImage = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cms.access.user.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                // reset()
            },
        });
    };

    return (
        <Box m="20px">
            <Header title={`Buat Pengguna`} subtitle={`Buat Pengguna Baru`} />
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
                    <Box
                        display="flex"
                        justifyContent="center"
                        sx={{ gridColumn: "span 4" }}
                    >
                        <label htmlFor="avatar_upload" tabIndex={0}>
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    cursor: "pointer",
                                }}
                                src={avatarUrl}
                            />
                            <input
                                tabIndex={1}
                                type="file"
                                id="avatar_upload"
                                hidden
                                onInput={(e) => {
                                    handleChangeImage(e);
                                    setAvatarUrl(createUrlImage(e));
                                }}
                                name="avatar"
                                accept="image/png"
                            />
                        </label>
                    </Box>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        onChange={handleChange}
                        name="name"
                        value={data.name}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Username"
                        onChange={handleChange}
                        name="username"
                        value={data.username}
                        error={!!errors.username}
                        helperText={errors.username}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        onChange={handleChange}
                        name="email"
                        value={data.email}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="password"
                        label="Password"
                        onChange={handleChange}
                        name="password"
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="password"
                        label="Password Confirmation"
                        onChange={handleChange}
                        name="password_confirmation"
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <FormControl
                        variant="filled"
                        sx={{ gridColumn: "span 4" }}
                        error={!!errors.roles}
                    >
                        <InputLabel id="roles-label" variant="filled">
                            Pilih Jabatan
                        </InputLabel>
                        <Select
                            labelId="roles-label"
                            id="roles"
                            multiple
                            value={data.roles}
                            name="roles"
                            onChange={handleChange}
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {roles.map((role, index) => (
                                <MenuItem
                                    key={role.id + index}
                                    value={role.name}
                                >
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {!!errors.roles && (
                            <FormHelperText error={!!errors.roles}>
                                {errors.roles}
                            </FormHelperText>
                        )}
                    </FormControl>
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

Create.layout = (page) => <Backend children={page} title="Create User" />;
