import React from 'react';
// import PropTypes from 'prop-types';
import themr from '../utils/themr';
import {ripple} from '../ripple/Ripple';
import theme from './theme.css';
import {SWITCH} from '../identifiers';

@themr(SWITCH, theme)
@ripple({centered: true, spread: 2.6})
export class Thumb extends React.Component {
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
