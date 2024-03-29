export function generateSVG(paths: string[], className = "bg-slate", fillColor = "#595d63") {
    return (
        <svg
            className={`${className}`}
            enableBackground="new 0 0 24 24"
            height={24}
            width={24}
            focusable={false}
            viewBox="0 0 24 24"
        >
            <g>
                <rect fill="none" height={24} width={24}></rect>
            </g>
            {paths.map((path) => (
                <path key={path} style={{ fill: fillColor }} d={path} />
            ))}
        </svg>
    );
}