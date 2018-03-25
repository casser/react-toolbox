import * as React from "react";
// import PropTypes from 'prop-types';
import themr from '../utils/themr';
import {ripple} from '../ripple/Ripple';
import theme from './theme.css';
import {SWITCH} from '../identifiers';
import {ReactNode} from "react";

interface ThumbProps {
  children?: ReactNode;
  disabled?:boolean;
  ripple?: boolean;
  onMouseDown?: React.MouseEventHandler<Element>;
  theme: {
    ripple?: string;
    thumb?: string
  }
};

@themr(SWITCH, theme)
@ripple({centered: true, spread: 2.6})
export class Thumb extends React.Component<ThumbProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   onMouseDown: PropTypes.func,
  //   theme: PropTypes.shape({
  //     ripple: PropTypes.string,
  //     thumb: PropTypes.string,
  //   }),
  // };

  render() {
    const {onMouseDown, theme, ...other} = this.props;
    return <span className={theme.thumb} onMouseDown={onMouseDown} {...other} />;
  }
}


export default Thumb;
