import { generateSVG } from "../../../services/generate.service";

interface MicroLabelProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    isPlaying?: boolean;
}

export const MicroLabel: React.FC<MicroLabelProps> = ({ onClick, isPlaying }) => {
    const svgElementVolumn = generateSVG([
        "M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z",
        "M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
    ]);

    const svgStopAudio = generateSVG(["M6,6h12v12H6V6z"]);
    return (
        isPlaying ? <button onClick={onClick} className="rounded-full p-2 hover:bg-slate-200">
            {svgStopAudio}
        </button>
            :
            <button onClick={onClick} className="rounded-full p-2 hover:bg-slate-200">
                {svgElementVolumn}
            </button>
    );
}
export default MicroLabel;