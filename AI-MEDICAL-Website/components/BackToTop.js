const BackToTop = () => {
    return (
        <div className="back-to-top">
            <button className="back-to-top--wrapper" type="button" onClick={(e) => e.preventDefault() || window.scrollTo({ top: 0, behavior: 'smooth'})}>
                <img src="/images/back-to-top.png" alt="Back To Top" />
            </button>
        </div>
    )
}

export default BackToTop;