import * as React from "react";
// import PropTypes from 'prop-types';
import { range } from '../utils/utils';
import Hand from './ClockHand';
import Face from './ClockFace';


interface MinutesProps {
  center: {
    x:number;
    y:number;
  };
  onChange: Function;
  onHandMoved: Function;
  radius: number;
  selected: number;
  spacing: number;
  theme: {
    small?: string;
    active?: string;
    face?: string;
    number?: string;
    hand?:string;
    knob?:string
  };
}

const minutes = range(0, 60, 5);
const step = 360 / 60;

class Minutes extends React.Component<MinutesProps> {
  // static propTypes = {
  //   center: PropTypes.shape({
  //     x: PropTypes.number,
  //     y: PropTypes.number,
  //   }),
  //   onChange: PropTypes.func,
  //   radius: PropTypes.number,
  //   selected: PropTypes.number,
  //   spacing: PropTypes.number,
  //   theme: PropTypes.shape({
  //     small: PropTypes.string,
  //   }),
  // };
  private handNode:Hand;

  static defaultProps = {
    selected: 0,
    onChange: null,
  };

  handleHandMove = (degrees) => {
    this.props.onChange(degrees / step);
  };

  handleMouseDown = (event) => {
    this.handNode.mouseStart(event);
  };

  handleTouchStart = (event) => {
    this.handNode.touchStart(event);
  };

  render() {
    return (
      <div>
        <Face
          onTouchStart={this.handleTouchStart}
          onMouseDown={this.handleMouseDown}
          numbers={minutes}
          spacing={this.props.spacing}
          radius={this.props.radius}
          active={this.props.selected}
          theme={this.props.theme}
          twoDigits
        />
        <Hand
          ref={(node) => { this.handNode = node; }}
          className={minutes.indexOf(this.props.selected) === -1 ? this.props.theme.small : ''}
          angle={this.props.selected * step}
          length={this.props.radius - this.props.spacing}
          onMove={this.handleHandMove}
          origin={this.props.center}
          theme={this.props.theme}
          step={step}
        />
      </div>
    );
  }
}

export default Minutes;
