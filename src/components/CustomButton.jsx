import React, { useState } from "react"

export default function CustomButton(props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            type={props.type && props.type}
            style={{
                width: props.width,
                background: isHovered && props.hoveredBackground ? props.hoveredBackground : props.background,
                padding: `${props.paddingY} ${props.paddingX}`,
                border: props.border,
                color: isHovered && props.hoveredColor ? props.hoveredColor : props.color,
                borderRadius: props.radius !== 'full' && props.radius,
                backdropFilter: props.blur && 'blur(25px)',
                boxShadow: props.shadow,
                cursor: 'pointer',
                transition: '0.3s ease',
                position: 'relative',
                overflow: 'hidden',
            }}
            className={`${props.radius === 'full' && 'rounded-pill'}`}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => props.href ? window.location.href = props.href : null}
        >
            <div
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    background: props.slideBackground,
                    top: 0,
                    left: isHovered ? 0 : '-100%',
                    transition: '0.3s ease',
                }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>{props.title}</span>
        </button>
    )
}