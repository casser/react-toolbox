/* eslint-disable no-mixed-operators */
import * as React from "react";
// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import ReactToolbox from "../types";
import {CSSProperties} from "react";


interface FaceProps extends ReactToolbox.Props {
  active?: number;
  numbers: number[];
  radius: number;
  spacing: number;
  theme: {
    active?: string;
    face?: string;
    number?: string;
  };
  twoDigits?: boolean;
}

class Face extends React.Component<FaceProps> {
  // static propTypes = {
  //   active: PropTypes.number,
  //   numbers: PropTypes.arrayOf(PropTypes.number),
  //   radius: PropTypes.number,
  //   spacing: PropTypes.number,
  //   theme: PropTypes.shape({
  //     active: PropTypes.string,
  //     face: PropTypes.string,
  //     number: PropTypes.string,
  //   }),
  //   twoDigits: PropTypes.bool,
  // };

  static defaultProps = {
    active: null,
    numbers: [],
    radius: 0,
    twoDigits: false,
  };

  numberStyle(rad, num):CSSProperties {
    return {
      position: 'absolute',
      left: (rad + rad * Math.sin(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing),
      top: (rad - rad * Math.cos(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing),
    };
  }

  faceStyle() {
    return {
      height: this.props.radius * 2,
      width: this.props.radius * 2,
    };
  }

  renderNumber = (number, idx) => {
    const { active, radius, spacing, theme, twoDigits } = this.props;
    return (
      <span
        className={cn(theme.number, { [theme.active]: number === active })}
        style={this.numberStyle(radius - spacing, idx + 1)}
        key={number}
      >
        {twoDigits ? (`0${number}`).slice(-2) : number}
      </span>
    );
  };

  render() {
    const { numbers, onTouchStart, onMouseDown, theme } = this.props; // eslint-disable-line
    return (
      <div
        className={theme.face}
        onTouchStart={onTouchStart}
        onMouseDown={onMouseDown}
        style={this.faceStyle()}
      >
        {numbers.map(this.renderNumber)}
      </div>
    );
  }
}

export default Face;
