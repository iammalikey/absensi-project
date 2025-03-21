import React, { useMemo, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
    Box,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Link, usePage, router } from "@inertiajs/react";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "@/theme.js";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import EditOffIcon from "@mui/icons-material/EditOff";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import ScheduleIcon from "@mui/icons-material/Schedule"; // ICON SHIFT
import { hasAnyPermission } from "@/Utils/helper";

const Item = ({ title, to, icon, url }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={url.startsWith(new URL(to).pathname)}
            style={{ color: colors.grey[100] }}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link href={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:900px)");
    const [isCollapsed, setIsCollapsed] = useState(false);

    useMemo(() => {
        setIsCollapsed(isNonMobile ? false : true);
    }, [isNonMobile]);

    const url = usePage().url;

    return (
        <Box
            sx={{
                flexShrink: 0,
                width: `${
                    isNonMobile ? (isCollapsed ? "80px" : "270px") : "80px"
                }`,
                transition: "width .4s",
                "& .pro-sidebar": { position: "fixed" },
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: `5px ${
                        isCollapsed ? "35px" : "5px"
                    } 5px 20px !important`,
                },
                "& .pro-inner-item:hover": {
                    color: `${colors.danamonAccent[400]} !important`,
                },
                "& .pro-menu-item.active": {
                    color: `${colors.danamonAccent[400]} !important`,
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                            height: `${isNonMobile ? "60px" : "40px"}`,
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.get(route("landing"));
                                    }}
                                    className="w-max aspect-[11/4] mx-auto my-0 bg-white p-1 rounded-md"
                                >
                                    <img
                                        src="/assets/images/concrete-logo.png"
                                        alt="concrete logo"
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <IconButton>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to={route("cms.dashboard")}
                            icon={<HomeOutlinedIcon />}
                            url={url}
                        />
                        {hasAnyPermission(["division management"]) && (
                            <Item
                                title="Divisi"
                                to={route("cms.division.index")}
                                icon={<HomeWorkOutlinedIcon />}
                                url={url}
                            />
                        )}
                        {hasAnyPermission(["employee management"]) && (
                            <Item
                                title="Pegawai"
                                to={route("cms.employee.index")}
                                icon={<GroupOutlinedIcon />}
                                url={url}
                            />
                        )}
                        {hasAnyPermission(["attendance management"]) && (
                            <Item
                                title="Absensi"
                                to={route("cms.attendance.index")}
                                icon={<ManageHistoryOutlinedIcon />}
                                url={url}
                            />
                        )}
                        {hasAnyPermission(["log management"]) && (
                            <Item
                                title="Laporan Absensi"
                                to={route("cms.log.index")}
                                icon={<BarChartOutlinedIcon />}
                                url={url}
                            />
                        )}

                        {hasAnyPermission([
                            "user management",
                            "role management",
                            "permission management",
                        ]) && (
                            <>
                                <Typography
                                    variant="h6"
                                    color={colors.grey[300]}
                                    sx={{ m: "15px 0 5px 20px" }}
                                >
                                    Access
                                </Typography>
                                {hasAnyPermission(["user management"]) && (
                                    <Item
                                        title="Pengguna"
                                        to={route("cms.access.user.index")}
                                        icon={<ManageAccountsIcon />}
                                        url={url}
                                    />
                                )}
                                {hasAnyPermission(["role management"]) && (
                                    <Item
                                        title="Jabatan"
                                        to={route("cms.access.role.index")}
                                        icon={<BadgeIcon />}
                                        url={url}
                                    />
                                )}
                                {hasAnyPermission([
                                    "permission management",
                                ]) && (
                                    <Item
                                        title="Perizinan"
                                        to={route(
                                            "cms.access.permission.index"
                                        )}
                                        icon={<EditOffIcon />}
                                        url={url}
                                    />
                                )}
                            </>
                        )}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
