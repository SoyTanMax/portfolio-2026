export default function XMarkIcon({color, width, solid, classes}: Props){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color ?? "black"} width={width} className={classes}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}

type Props = {
    width?: number,
    color?: string,
    solid?: boolean,
    classes?: string, 
}