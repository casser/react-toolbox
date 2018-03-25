import React from 'react';
// import PropTypes from 'prop-types';
import {ripple} from '../ripple/Ripple';
import { RADIO } from '../identifiers';
import themr  from '../utils/themr';
import theme from './theme.css';

@ripple({ centered: true, spread: 2.6 })
@themr(RADIO, theme)
export class Radio extends React.Component {
  // static propTypes = {
  //   checked: PropTypes.bool,
  //   children: PropTypes.node,
  //   onMouseDown: PropTypes.func,
  //   theme: PropTypes.shape({
  //     radio: PropTypes.string,
  //     radioChecked: PropTypes.string,
  //     ripple: PropTypes.string,
  //   }),
  // };
  render() {
    const { checked, onMouseDown, theme, ...other } = this.props;
    return (<div
      data-react-toolbox="radio"
      className={theme[checked ? 'radioChecked' : 'radio']}
      onMouseDown={onMouseDown}
      {...other}
    />);
  }

}
export default Radio;
