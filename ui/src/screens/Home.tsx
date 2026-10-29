import { TransitionGroup, CSSTransition } from "react-transition-group";
import Translate from "../components/Translate";
// import './css/Home.css'

export function Home() {
    return (
        // <div>
        //     <TransitionGroup>
        //         <CSSTransition
        //             in={true}
        //             timeout={1000}
        //             classNames="fade"
        //         >
        <Translate />
        //         </CSSTransition>
        //     </TransitionGroup>
        // </div>
    );
}
export default Home;

