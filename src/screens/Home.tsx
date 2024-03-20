import { useState } from "react";
import Translate from "../components/Translate";
import { Collapse, Nav, Navbar, NavItem } from 'react-bootstrap';


export function Home() {
    return <Translate />

    // const [expanded, setExpanded] = useState(false);

    // return (
    //     <div>
    //         <Navbar expanded={expanded}>
    //             <Navbar.Brand href="#">Navbar</Navbar.Brand>
    //             <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
    //             <Navbar.Collapse in={expanded}>
    //                 <Nav>
    //                     <NavItem href="#">Home</NavItem>
    //                     <NavItem href="#">About</NavItem>
    //                     <NavItem href="#">Contact</NavItem>
    //                 </Nav>
    //             </Navbar.Collapse>
    //         </Navbar>
    //         <Collapse in={expanded}>
    //             <div>
    //                 Đây là nội dung collapse menu
    //             </div>
    //         </Collapse>
    //     </div>
    // );
}
export default Home;

