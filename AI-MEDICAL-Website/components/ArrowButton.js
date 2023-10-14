import React from "react";

export default function ArrowButton({ size, children, ...props }) {
  return (
    <div className={`arrow-button ${size === "small" ? 'xs' : ''}`} {...props}>
      <div className="arrow-button--wrapper">{ children }</div>
      <div className="arrow-button--circle"></div>
    </div>
  );
}