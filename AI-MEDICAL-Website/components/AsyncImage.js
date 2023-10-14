import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const imgVarients = {
    loading: {
        opacity: 0
    },
    loaded: {
        opacity: 1
    }
}

const placeholderVarients = {
    loading: {
        opacity: 1
    },
    loaded: {
        opacity: 0
    }
}

const AsyncImage = ({ src, alt, height, width, className, objectFit = false, loading =  "lazy" }) => {
    const imgRef = useRef();
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        if (imgRef.current instanceof Node) {
            if (imgRef.current.complete) {
                setLoaded(true);
            } else {
                imgRef.current.addEventListener("load", () => {
                    if (imgRef.current != null) setLoaded(true);
                })
            }
        }
    }, [ imgRef.current ])

    return (
        <span style={{ position: "relative", display: "inline-block", fontSize: 0, ...(objectFit ? { width: "100%", height: "100%" } : {}) }}>
            <motion.img
                src={src} alt={alt} height={height} width={width} ref={imgRef} initial="loading" animate={loaded ? "loaded" : "loading"}
                variants={imgVarients} className={className} transition={{ duration: .5 }} loading={loading}
                style={objectFit ? { width: "100%", height: "100%", objectFit: "cover" } : { width: "100%" }}
            />
            <motion.span
                initial="loading" animate={loaded ? "loaded" : "loading"} variants={placeholderVarients} style={{
                    position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", backgroundColor: "rgba(255, 255, 255, .1)",
                    // filter: "blur(50px)"
                }}
            ></motion.span>
        </span>
    )
}

export default AsyncImage;