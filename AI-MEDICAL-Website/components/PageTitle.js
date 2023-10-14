const PageTitle = ({ children, align, underline, underlineMaxWidth, shadow }) => {
    if (align === "left") {
        return (
            <div>
                <div className={`page-title${underline?" underline":""}${underlineMaxWidth?" ul-max":""}${shadow?" text-shadow":""}`}>
                    { children }
                    { underline && <div className="page-title--underline"></div> }
                </div>
            </div>
        )
    }
    return (
        <div style={{ textAlign: "center" }}>
            <div className={`page-title${underline?" underline":""}${underlineMaxWidth?" ul-max":""}${shadow?" text-shadow":""}`}>
                { children }
                { underline && <div className="page-title--underline"></div> }
            </div>
        </div>
    )
}

export default PageTitle;