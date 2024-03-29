import { useState } from "react";
import { generateSVG } from "../../../services/generate.service";

interface VoLumeLabelProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    isPlaying?: boolean;
    text?: string;
}
export const VoLumeLabel: React.FC<VoLumeLabelProps> = ({ onClick, isPlaying, text }) => {
    const svgElementVolumn = generateSVG([
        "M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z",
        "M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"
    ]);

    const svgStopAudio = generateSVG(["M6,6h12v12H6V6z"], "bg-red", "#f00000");
    return (
        <button onClick={onClick} className="rounded-full p-2 hover:bg-slate-200">
            {isPlaying ? svgStopAudio : svgElementVolumn}
        </button>
    );
}
export default VoLumeLabel;
