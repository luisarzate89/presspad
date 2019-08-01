import React from "react";

/**
 * Progress Bar appear at the bottom of a component.
 * @param {component} children The component that should be wrapped with the progressBar.
 * @param {number} progress The presentage of the progress bar.
 */

const ProgressBar = ({ children, progress = 0 }) => {
  return (
    <div>
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
