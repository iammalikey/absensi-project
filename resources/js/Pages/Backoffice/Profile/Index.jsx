import { useForm, usePage } from '@inertiajs/react';
import { Avatar, Box, Button, TextField, useMediaQuery } from '@mui/material';
import React, { useState } from 'react'
import Backend from '@/Layouts/Backoffice/Backend';
import Header from "@/components/Backoffice/Header";
import { createUrlImage } from '@/Utils/helper';

export default function Index() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { auth:{ user } } = usePage().props

  const { data, setData, reset, errors, post } = useForm({
    name: user.name,
    username: user.username,
    email: user.email,
    _method: 'put'
  })
  // buat tampung file avatar
  const [avatarUrl, setAvatarUrl] = useState(user.avatar)

  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
  }

  const handleChangeImage = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.files[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('cms.profile.update'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (page) => {
        // reset()
      },
    })
  }

  return (
    <Box m="20px">
      <Header title={`Profile`} subtitle={`Update ${user.name} profile`} />
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            sx={{ gridColumn: "span 4" }}
          >
            <label htmlFor="avatar_upload" tabIndex={0}>
              <Avatar sx={{ width: 100, height: 100, cursor: 'pointer' }} src={avatarUrl} />
              <input tabIndex={1} type="file" id='avatar_upload' hidden onInput={(e) => {handleChangeImage(e); setAvatarUrl(createUrlImage(e))}} name="avatar" accept="image/png"/>
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
            disabled
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
            disabled
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
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Update
          </Button>
        </Box>
      </form>
    </Box>
  )
}

Index.layout = (page) => <Backend children={page} title="Profile"/>;