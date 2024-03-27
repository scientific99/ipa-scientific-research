import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './css/test.css';

function Test() {
    const [activeDiv, setActiveDiv] = useState<string | null>(null);

    return (
        <div className="container">
            <div className="div-item" onClick={() => setActiveDiv("left")}>
                <CSSTransition
                    in={activeDiv === "left"}
                    timeout={500}
                    classNames="underline"
                    unmountOnExit
                >
                    <div>Div Left</div>
                </CSSTransition>
            </div>
            <div className="div-item" onClick={() => setActiveDiv("right")}>
                <CSSTransition
                    in={activeDiv === "right"}
                    timeout={500}
                    classNames="underline"
                    unmountOnExit
                >
                    <div>Div Right</div>
                </CSSTransition>
            </div>
        </div>
    );
}

export default Test;