export const Checkbox = (props) => {

    const handleClick = () => {
        props.onClick();
    }

    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleClick} style={{cursor : 'pointer'}}>
            <g filter="url(#filter0_d_1_429)">
                <rect x="5" y="2" width="20" height="20" rx="5" fill={props.props? 'black':'#D9D9D9'} />
                <path d="M10 11.4783L14.8148 16L20 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <filter id="filter0_d_1_429" x="0" y="0" width="30" height="30" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="2.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.18 0 0 0 0 0.18 0 0 0 0 0.26 0 0 0 0.08 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_429" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_429" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};