import "./style.css";
import CreateIcon from "@mui/icons-material/Create";
import MovieIcon from '@mui/icons-material/Movie';
// import SiderLayout from "../siderLayout";
import {
    InboxOutlined,
    LogoutOutlined,
    MailOutlined,
    SaveOutlined,
    SendOutlined,
    SettingOutlined,
    ToolOutlined,
    UserOutlined,
    IdcardOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Badge,
    Col,
    Layout,
    Menu,
    Row,
    Space,
    Tabs,
    Typography,
    type MenuProps,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Button from "@mui/material/Button";
// import { useAppSelector, useAppDispatch } from "../../redux/store";
// import { setUser } from "../../redux/actions/userAction";
// import { logoutAction } from "../../redux/actions/auth";
// import ProtectedRoute from "../../components/common/ProtectedRoute";

type MenuItem = Required<MenuProps>["items"][number];

// const { Sider, Content } = Layout;

const BoardsComponent = () => {
    // const userState = useAppSelector((state) => state.user);
    // const navigate = useNavigate();

    // const [openKeys, setOpenKeys] = useState<string[]>([]);
    // const dispatch = useAppDispatch();

    // const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    //     setOpenKeys(keys);
    // };

    // const handleMenuClick: MenuProps["onClick"] = async (e) => {
    //     switch (e.key) {
    //         case "logout":
    //             await dispatch(logoutAction(navigate));
    //             break;
    //         case "profile":
    //             navigate("/profile");
    //             break;
    //         default:
    //             break;
    //     }
    // };

    // const userRoleId = 1;

    // useEffect(() => {
    //     if (!userState.userData) {
    //         dispatch(setUser());
    //     }
    // }, [dispatch, userState.userData]);

    const { Header } = Layout;

    const tabItems = [
        { key: "time1", label: "Đang chiếu" },
        { key: "time2", label: "Sắp chiếu" },
        { key: "time3", label: "Ưu đãi" },
        { key: "time4", label: "Vé của tôi" },
    ];

    // const menuItems: MenuItem[] = useMemo(() => {
    //     const items: MenuItem[] = [
    //         {
    //             key: "profile",
    //             icon: <IdcardOutlined />,
    //             label: "Thông tin cá nhân",
    //         },
    //         {
    //             key: "jobManage",
    //             icon: <InboxOutlined />,
    //             label: "Công việc của tôi",
    //             children: [
    //                 {
    //                     key: "savedJobs",
    //                     icon: <SaveOutlined />,
    //                     label: "Stack riêng tư",
    //                 },
    //             ],
    //         },
    //         {
    //             key: "emailSettings",
    //             icon: <MailOutlined />,
    //             label: "Cài đặt email & Thông báo",
    //             children: [
    //                 {
    //                     key: "notifications",
    //                     icon: <MailOutlined />,
    //                     label: "Thông Báo",
    //                 },
    //             ],
    //         },
    //         {
    //             key: "settings",
    //             icon: <SettingOutlined />,
    //             label: "Cài đặt & Hỗ trợ",
    //             children: [
    //                 {
    //                     key: "config",
    //                     icon: <ToolOutlined />,
    //                     label: "Cài đặt",
    //                 },
    //                 {
    //                     key: "help",
    //                     icon: <SendOutlined />,
    //                     label: "Trợ giúp & Hỗ trợ",
    //                 },
    //             ],
    //         },
    //     ];

    // if (userRoleId === 1 || userRoleId === 2) {
    //     items.push({
    //         key: "admin",
    //         icon: <UserOutlined />,
    //         label: "Admin",
    //         children: [
    //             {
    //                 key: "adminPage",
    //                 icon: <UserOutlined />,
    //                 label: "AD",
    //             },
    //         ],
    //     });
    // }

    //     items.push({
    //         key: "logout",
    //         icon: <LogoutOutlined />,
    //         label: "Đăng xuất",
    //         danger: true,
    //     });

    //     return items;
    // }, [userRoleId]);

    return (
        // <ProtectedRoute requiredPermissions={[]}>
        <Layout className="header-boards" style={{
            height: "100vh",
            width: "100wh",
        }}>
            <Header className="header-nav">
                <Row
                    align="middle"
                    justify="space-between"
                    gutter={16}
                    className="header-nav-content"
                >
                    <Col>
                        <Space size="middle" align="center">
                            <Typography.Text className="text-boards">
                                CINEMA
                            </Typography.Text>
                            <MovieIcon className="icon-pen" />
                        </Space>
                    </Col>
                    <Col flex="auto">
                        <Tabs items={tabItems} className="header-nav-tabs" />
                    </Col>

                    <Col className="from-auth">
                        <Button variant="outlined">Đăng nhập</Button>
                        {/* <Badge count={1}>
                            <Avatar size="large" icon={<UserOutlined />} />
                        </Badge> */}
                    </Col>

                    {/* <Col className="from-list-item">
                            <Menu
                                mode="inline"
                                openKeys={openKeys}
                                onOpenChange={onOpenChange}
                                onClick={handleMenuClick}
                                style={{ width: "100%", borderRight: 0 }}
                                items={menuItems}
                            />
                        </Col> */}
                </Row>
            </Header>
            {/* <Layout className="main-layout">
                    <Sider width={300} className="sider-layout">
                        <SiderLayout />
                    </Sider>
                    <Content className="content-layout">
                        <Outlet />
                    </Content>
                </Layout> */}

            <main className="flex-1  mt-16 overflow-y-auto min-h-[calc(100vh-64px)]">
                <Outlet />
            </main>
     
                  {/* Footer */}
            
        </Layout>
        
        // </ProtectedRoute>
    );
};
export default BoardsComponent;
