import { SetStateAction, useState } from "react";
import Translate from "../components/Translate";
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Link, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import './css/Home.css'
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { IoReceiptSharp, IoHomeSharp, IoIdCard, IoAlbums, IoMenuSharp } from "react-icons/io5";
import { Button, Container } from "react-bootstrap";
import { Document } from "../components/Document";
import { About } from "../components/About"
import { Feedback } from "../components/Feedback";

interface MenuItemComponent {
    key: string,
    icon: React.JSX.Element,
    component: React.JSX.Element,
    text: string,
    prefix: string
}
const ListItems: MenuItemComponent[] = [
    { key: "Translate", icon: <IoHomeSharp />, component: <Translate />, text: "Trang dịch", prefix: "home" },
    { key: "About", icon: <IoIdCard />, component: <About />, text: "Giới thiệu", prefix: "about" },
    { key: "Document", icon: <IoReceiptSharp />, component: <Document />, text: "Tài liệu chú thích", prefix: "document" },
    { key: "Feedback", icon: <IoAlbums />, component: <Feedback />, text: "Góp ý", prefix: "feedback" }
]

const sidebarDefaultWidth = "220px"
const sidebarCollapsedWidth = "80px"

export function Home() {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MenuItemComponent | undefined>(ListItems[0]);
    const [sidebarWidth, setSidebarWidth] = useState(sidebarDefaultWidth)
    const handleItemClick = (itemKey: SetStateAction<string>) => {
        const itemChange = ListItems.filter(item => item.key === itemKey).pop()
        setSelectedItem(itemChange);
    }

    const handleCollapsed = () => {
        if (collapsed == false) {
            setSidebarWidth(sidebarCollapsedWidth);
            setCollapsed(true);
        } else {
            setSidebarWidth(sidebarDefaultWidth);
            setCollapsed(false)
        }
    }
    return <>
        <div className="home-main">
            <div className="flex fixed h-screen z-20 left-0 top-0">
                <Sidebar
                    collapsed={collapsed}
                    // transitionDuration={500}
                    collapsedWidth="80px"
                    width={sidebarWidth}
                    rootStyles={{
                        [`.${sidebarClasses.container}`]: {
                            backgroundColor: '#0b2948',
                            color: '#a7bbcf',
                            fontSize: '15px',
                            fontWeight: 400,
                        },
                    }}>
                    <div className="flex border-b border-solid border-[#15497d]">
                        <Button
                            className="mx-6 my-3 rounded-full p-2 hover:bg-sky-800 text-base"
                            onClick={() => handleCollapsed()}
                        >
                            <IoMenuSharp />
                        </Button>
                        <img
                            className="h-9 w-auto my-3 flex rounded-full items-center"
                            src={require("./../images/logo_main.png")}
                            alt="logo"
                        />
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
                            <MenuItem
                                className="menu-item"
                                active={selectedItem?.key === item.key}
                                key={item.key}
                                icon={item.icon}
                                onClick={() => handleItemClick(item.key)}
                            >
                                {item.text}
                            </MenuItem>
                        ))}
                    </Menu>
                </Sidebar>
            </div>
            <Container
                className="flex w-screen relative"
                style={{ marginLeft: sidebarWidth }}
            >
                <Header />
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={selectedItem?.key}
                        addEndListener={(node, done) => { node.addEventListener('transitionend', done, false); }}
                        classNames="fade"
                        timeout={{ enter: 300, exit: 300 }}
                    >
                        <div
                            className="page z-0 transition ease-in-out delay-1000"
                        >
                            {selectedItem?.component}
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </Container>
        </div >
    </>
}
export default Home;

