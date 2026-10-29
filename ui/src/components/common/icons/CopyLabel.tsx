import { generateSVG } from "../../../services/generate.service";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface CopyLabelProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    isPlaying?: boolean;
    text: string
}

export const CopyLabel: React.FC<CopyLabelProps> = ({ onClick, className, text }) => {
    const svgElement = generateSVG(['M16,20H5V6H3v14c0,1.1,0.9,2,2,2h11V20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9 C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z']);
    return (
        <CopyToClipboard text={text}>
            <button onClick={onClick} className={`rounded-full p-2 hover:bg-slate-200 ${className}`}>
                {svgElement}
            </button>
        </CopyToClipboard>
    );
};
export default CopyLabel;