import React, { useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

export function Document() {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const handleClick = (buttonId: string) => {
        setActiveButton(buttonId);
    };

    return (
        <div className="App">
            <button
                className={`button ${activeButton === "A" ? "active" : ""}`}
                onClick={() => handleClick("A")}
            >
                Button A
            </button>
            <button
                className={`button ${activeButton === "B" ? "active" : ""}`}
                onClick={() => handleClick("B")}
            >
                Button B
            </button>
        </div>
    );
}