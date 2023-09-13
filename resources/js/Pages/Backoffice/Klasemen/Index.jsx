import Backend from "@/Layouts/Backoffice/Backend";
import React from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    styled,
    tableCellClasses,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Header from "@/Components/Backoffice/Header";
import { usePage } from "@inertiajs/react";

// icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { blue, pink } from "@mui/material/colors";

const Index = ({ klasemen }) => {
    // console.log(klasemen);
    const user = usePage().props.auth.user;

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    return (
        <Box sx={{ m: "20px" }}>
            <Header
                title={`Welcome Back ${user.name}`}
                subtitle={`Your Role ${user.role.map(
                    (role, index) => role.name
                )}`}
            ></Header>

            <Typography variant="h2" sx={{ fontSize: 25 }} gutterBottom>
                Klasemen
            </Typography>

            <TableContainer component={null}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="right">
                                Score
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                CTA Title
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                CTA Link
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {klasemen.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {row.title}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.score}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.cta_title}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.cta_link}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Tooltip title="Edit">
                                        <IconButton aria-label="EditIcon">
                                            <EditIcon
                                                sx={{ color: blue[500] }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Index;
Index.layout = (page) => <Backend children={page} title="Dashboard CMS" />;
