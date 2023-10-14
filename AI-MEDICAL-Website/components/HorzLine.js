const HorzLine = ({ children }) => {
    return (
        <div className="horz-line">
            <div className="horz-line--el"></div>
            <div className="horz-line--wrapper">
                { children }
            </div>
            <div className="horz-line--el"></div>
        </div>
    )
}

export default HorzLine;