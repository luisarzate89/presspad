import React from "react";
import { Icon } from "antd";
/**
 * Progress Bar appear at the bottom of a component.
 * @param {component} children The component that should be wrapped with the progressBar.
 * @param {number} progress The presentage of the progress bar.
 */

const ProgressBar = ({ children, progress = 0, style }) => {
  return (
    <div style={{ position: "relative", ...style }}>
      {progress === 100 && (
        <Icon
          type="check"
          style={{
            color: "green",
            fontSize: "18px",
            position: "absolute",
            zIndex: 1,
            top: "7px",
            right: "7px"
          }}
        />
      )}
      {children}
      <span
        style={{
          background: progress === 100 ? "green" : "blue",
          height: 3,
          display: "block",
          width: `${progress}%`,
          transition: "width 2s linear"
        }}
      />
    </div>
  );
};

export default ProgressBar;
