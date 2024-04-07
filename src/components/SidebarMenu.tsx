import { useEffect, useState } from 'react';
import { IoAlbums, IoHomeSharp, IoIdCard, IoMenuSharp, IoReceiptSharp, IoPersonAddSharp, IoLibraryOutline } from 'react-icons/io5';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { useAuth } from "../components/auth/AuthContext"
import { Link } from 'react-router-dom';

interface SidebarProp {
    collapsed?: boolean,
    handleCollapsed?: any,
    sidebarWidth: any,
    setSidebarWidth: any,
    activeKey: any,
    setActiveKey: any,
    toggled: any,
    setToggled: any,
}
interface MenuItemComponent {
    key: string,
    icon: React.JSX.Element,
    text: string,
    prefix: string,
    type: string,
}
const ListPrefix: MenuItemComponent[] = [
    { key: "Translate", icon: <IoHomeSharp />, text: "Trang dịch", prefix: "/home", type: "item" },
    { key: "About", icon: <IoIdCard />, text: "Giới thiệu", prefix: "/about", type: "item" },
    { key: "Document", icon: <IoReceiptSharp />, text: "Tài liệu chú thích", prefix: "/document", type: "item" },
    { key: "Feedback", icon: <IoAlbums />, text: "Góp ý", prefix: "/feedback", type: "item" },
    { key: "FeedbackTable", icon: <IoLibraryOutline />, text: "Danh sách góp ý", prefix: "/feedback/list", type: "item" },
    { key: "login", icon: <IoPersonAddSharp />, text: "Đăng nhập", prefix: "/admin/login", type: "footer" },
    { key: "logout", icon: <IoPersonAddSharp />, text: "Đăng xuất", prefix: "/admin/login", type: "footer" }
]


const loginPrefix: MenuItemComponent = { key: "login", icon: <IoPersonAddSharp />, text: "Đăng nhập", prefix: "/admin/login", type: "footer" }
const logoutPrefix: MenuItemComponent = { key: "logout", icon: <IoPersonAddSharp />, text: "Đăng xuất", prefix: "/admin/login", type: "footer" }

const sidebarDefaultWidth = "270px"
const sidebarCollapsedWidth = "80px"

const SidebarMenu = ({
    collapsed,
    handleCollapsed,
    sidebarWidth,
    setSidebarWidth,
    activeKey,
    setActiveKey,
    toggled,
    setToggled,
}: SidebarProp) => {
    const ListItems = ListPrefix.filter((item) => { return item.type === "item" });
    const { isLogin, prefix, setPrefix } = useAuth();
    const [loginKey, setLoginKey] = useState(isLogin ? logoutPrefix : loginPrefix);

    useEffect(() => {
        setLoginKey(isLogin ? logoutPrefix : loginPrefix)
    }, [isLogin])

    useEffect(() => {
        setActiveKey(prefix);
    }, [prefix])

    useEffect(() => {
        if (collapsed) {
            setSidebarWidth(sidebarCollapsedWidth);
        } else {
            setSidebarWidth(sidebarDefaultWidth);
        }
    }, [collapsed])

    const handleOnClickItem = (prefixActive: any) => {
        setPrefix(prefixActive);
        if ((window.innerWidth <= 767) && (collapsed === false)) {
            handleCollapsed()
        }
    }

    return (
        <div className="home-main">
            <div className="flex fixed h-screen z-20 left-0 top-0">
                <Sidebar
                    collapsed={collapsed}
                    toggled={false}
                    collapsedWidth={sidebarCollapsedWidth}
                    width={sidebarWidth}
                    transitionDuration={500}
                    rootStyles={{
                        [`.${sidebarClasses.container}`]: {
                            backgroundColor: '#0b2948',
                            color: '#a7bbcf',
                            fontSize: '15px',
                            fontWeight: 400,
                        },
                    }}
                >
                    <div className="flex border-b border-solid border-[#15497d] py-2">
                        <Menu
                            menuItemStyles={{
                                button: ({ level, active, disabled }) => {
                                    if (level === 0)
                                        return {
                                            color: disabled ? '#606061' : '#a7bbcf',
                                            menuContent: '#082440',
                                            backgroundColor: active ? '#00458b' : undefined,
                                            "&:hover": {
                                                backgroundColor: "#0b2948 !important",
                                                color: "white !important"
                                            }
                                        };
                                },
                            }}

                        >
                            {collapsed ? (
                                <MenuItem
                                    icon={<IoMenuSharp />}
                                    onClick={handleCollapsed}
                                ></MenuItem>
                            ) : (
                                <MenuItem
                                    suffix={<IoMenuSharp />}
                                    onClick={handleCollapsed}
                                >
                                    <div
                                        style={{
                                            padding: '9px',
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',
                                            fontSize: 15,
                                            letterSpacing: '1px'
                                        }}
                                    >
                                        PHIÊN ÂM TIẾNG VIỆT
                                    </div>
                                </MenuItem>
                            )}
                        </Menu>
                    </div>
                    <Menu
                        className="mt-6"
                        menuItemStyles={{
                            button: ({ level, active, disabled }) => {
                                if (level === 0)
                                    return {
                                        color: disabled ? '#606061' : '#a7bbcf',
                                        menuContent: '#082440',
                                        backgroundColor: active ? '#00458b' : undefined,
                                        borderRadius: "6px",
                                        "&:hover": {
                                            backgroundColor: "#335B8C !important",
                                            color: "white !important",
                                            borderRadius: "6px !important",
                                        }
                                    };
                            },
                        }}
                    >
                        {ListItems.map((item) => (
                            <Link to={item.prefix}>
                                <MenuItem
                                    className="menu-item"
                                    active={item.prefix === activeKey}
                                    onClick={() => { handleOnClickItem(item.prefix) }}
                                    key={item.key}
                                    icon={item.icon}
                                >
                                    {item.text}
                                </MenuItem>
                            </Link>
                        ))}
                    </Menu>
                    <div className='absolute w-full bottom-10'>
                        <Menu
                            menuItemStyles={{
                                button: ({ level, active, disabled }) => {
                                    if (level === 0)
                                        return {
                                            color: disabled ? '#606061' : '#a7bbcf',
                                            menuContent: '#082440',
                                            backgroundColor: active ? '#00458b' : undefined,
                                            "&:hover": {
                                                backgroundColor: "#0b2948 !important",
                                                color: "white !important"
                                            }
                                        };
                                },
                            }}

                        >
                            {/* <Link to={loginKey.prefix}>
                                <MenuItem
                                    className="menu-item"
                                    active={loginKey.prefix === activeKey}
                                    onClick={() => { handleOnClickItem(loginKey.prefix) }}
                                    key={loginKey.key}
                                    icon={loginKey.icon}
                                >
                                    {loginKey.text}
                                </MenuItem>
                            </Link> */}
                        </Menu>
                    </div>
                </Sidebar>
            </div>

        </div>

    )
}
export default SidebarMenu;