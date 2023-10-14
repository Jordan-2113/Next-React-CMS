const Button = ({ children, size, rouded, btnClass, maxWidth }) => {
    if (size === "l") {
        return (
            <div className={`btn px-4 py-3${rouded?" rounded-pill":""} s-shadow ${btnClass}`} style={maxWidth != null ? { maxWidth: maxWidth, width: "100%", margin: "auto" } : {}}>
                { children }
            </div>
        )
    }
    return (
        <div className={`btn${size==="s"?" p-2 px-5":" p-2 px-5"} ${rouded?" rounded-pill":""} s-shadow ${btnClass}`}>
            { children }
        </div>
    )
}

export default Button;