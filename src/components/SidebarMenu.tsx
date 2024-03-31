import { useEffect, useState } from 'react';
import { IoAlbums, IoHomeSharp, IoIdCard, IoMenuSharp, IoReceiptSharp } from 'react-icons/io5';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

interface SidebarProp {
    collapsed?: boolean,
    handleCollapsed?: any,
    sidebarWidth: any,
    setSidebarWidth: any
}
interface MenuItemComponent {
    key: string,
    icon: React.JSX.Element,
    text: string,
    prefix: string,
}
const ListItems: MenuItemComponent[] = [
    { key: "Translate", icon: <IoHomeSharp />, text: "Trang dịch", prefix: "/home" },
    { key: "About", icon: <IoIdCard />, text: "Giới thiệu", prefix: "/about" },
    { key: "Document", icon: <IoReceiptSharp />, text: "Tài liệu chú thích", prefix: "/document" },
    { key: "Feedback", icon: <IoAlbums />, text: "Góp ý", prefix: "/feedback" }
]


const sidebarDefaultWidth = "270px"
const sidebarCollapsedWidth = "80px"

const SidebarMenu = ({
    collapsed,
    handleCollapsed,
    sidebarWidth,
    setSidebarWidth
}: SidebarProp) => {

    useEffect(() => {
        if (collapsed) {
            setSidebarWidth(sidebarCollapsedWidth);
        } else {
            setSidebarWidth(sidebarDefaultWidth);
        }
    }, [collapsed])

    return (
        <div className="home-main">
            <div className="flex fixed h-screen z-20 left-0 top-0">
                <Sidebar
                    collapsed={collapsed}
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
                                    // active={selectedItem?.key === item.key}
                                    key={item.key}
                                    icon={item.icon}
                                >
                                    {item.text}
                                </MenuItem>
                            </Link>
                        ))}

                    </Menu>

                </Sidebar>
            </div>

        </div>

    )
}
export default SidebarMenu;