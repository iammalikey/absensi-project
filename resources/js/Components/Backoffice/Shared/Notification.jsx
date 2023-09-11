import { usePage } from "@inertiajs/react";
import { Alert, Snackbar } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

export default function Notification() {
    const { flash, errors } = usePage().props;

    // console.log(usePage().props.errors);
    // console.log(flash.alert);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (flash?.alert) setOpen(true);

        if (errors[500]) {
            Object.entries(errors[500]).map(([key, value]) => {
                enqueueSnackbar(value, {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            });
        }
    }, [flash.alert, errors[500]]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            {flash.alert && (
                <Alert
                    onClose={handleClose}
                    severity={flash.alert?.type}
                    sx={{ width: "100%" }}
                    variant="filled"
                    elevation={6}
                >
                    {flash.alert?.message}
                </Alert>
            )}
        </Snackbar>
    );
}

// import { Button, IconButton, Snackbar } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import { usePage } from "@inertiajs/react";

// const Notification = () => {
//     const { flash, errors } = usePage().props;
//     // console.log(usePage().props);
//     const [open, setOpen] = useState(false);

//     const handleClick = () => {
//         setOpen(true);
//     };

//     const handleClose = (e, reason) => {
//         if (reason === "clickaway") {
//             return;
//         }

//         setOpen(false);
//     };

//     const action = (
//         <>
//             <Button color="secondary" size="small" onClick={handleClose}>
//                 UNDO
//             </Button>
//             <IconButton
//                 size="small"
//                 aria-label="close"
//                 color="inherit"
//                 onClick={handleClose}
//             >
//                 <CloseIcon fontSize="small" />
//             </IconButton>
//         </>
//     );

//     useEffect(() => {
//         // if (flash.alert) setOpen(true);
//         if (errors[500]) {
//             Object.entries();
//         }
//     }, []);

//     return (
//         <>
//             <Button onClick={handleClick}>Open simple snackbar</Button>
//             <Snackbar
//                 open={open}
//                 autoHideDuration={6000}
//                 onClose={handleClose}
//                 message="Note archived"
//                 action={action}
//             />
//         </>
//     );
// };

// export default Notification;
