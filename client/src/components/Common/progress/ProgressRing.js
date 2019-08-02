import React, { Component } from "react";
import { Icon } from "antd";

/**
 * ProgressRing from CSS-tricks website
 * https://css-tricks.com/building-progress-ring-quickly/
 * @param {number} radius The raduis of the ring
 * @param {number} stroke The width of the progress ring
 * @param {number} progress The percentage of the progress ring
 * @param {object} style Any aditional style to add
 */

class ProgressRing extends Component {
  normalizedRadius = this.props.radius - this.props.stroke * 2;
  circumference = this.normalizedRadius * 2 * Math.PI;

  render() {
    const { radius, stroke, progress, style } = this.props;
    const strokeDashoffset =
      this.circumference - (progress / 100) * this.circumference;

    return (
      <>
        {progress === 100 && (
          <Icon
            type="check"
            style={{
              color: "green",
              fontSize: "18px",
              position: "absolute",
              zIndex: 1,
              transform: "translate(-50%, -50%)",
              top: "50%"
            }}
          />
        )}
        <svg height={radius * 2} width={radius * 2} style={style}>
          <circle
            stroke={progress === 100 ? "green" : "blue"}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={this.circumference + " " + this.circumference}
            style={{
              strokeDashoffset,
              transition: "stroke-dashoffset 2s linear"
            }}
            r={this.normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
      </>
    );
  }
}

export default ProgressRing;
