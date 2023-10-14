const Appearance = ({ children, triangle }) => {
    return (
        <div className="appearance">
            <div className="appearance--wrapper">
                { children }
            </div>
            { triangle && <div className="appearance--arrow-right" /> }
        </div>
    )
}

export default Appearance;