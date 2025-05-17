export default function CustomHr(props) {
    return (
        <hr 
            className="rounded-pill"
            style={{
                border: 'none',
                background: props.background,
                height: props.height,
                width: props.width,
                opacity: 1,
            }}
        />
    )
}