import { generateSVG } from "../../../services/generate.service";
interface ClearLabelProps {
    key?: any
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    isPlaying?: boolean;
    text?: string
    hidlen?: boolean
}

export const ClearLabel: React.FC<ClearLabelProps> = ({ key, onClick, className, hidlen = false }) => {
    const svgElement = generateSVG(['M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z']);
    return (
        hidlen ? null :
            <button key={key} onClick={onClick} className={`rounded-full p-2 hover:bg-slate-100 ${className}`}>
                {svgElement}
            </button>
    );
}
export default ClearLabel;