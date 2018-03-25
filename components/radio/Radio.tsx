import * as React from "react";
// import PropTypes from 'prop-types';
import { ripple } from '../ripple/Ripple';
import { RADIO } from '../identifiers';
import themr from '../utils/themr';
import theme from './theme.css';

export interface RadioTheme {
  /**
   * Used to for the radio element.
   */
  radio?: string;
  /**
   * Used for the radio element when it's checked.
   */
  radioChecked?: string;
  /**
   * To provide styles for the ripple.
   */
  ripple?: string;
}

export interface RadioProps {
  /**
   * If true, the input element will be selected by default. Transferred from the parent.
   * @default false
   */
  checked?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Callback invoked on mouse down.
   */
  onMouseDown?: React.MouseEventHandler<Element>;
  /**
   * Additional properties passed to Radio container.
   */
  [key: string]: any;
}

@ripple({ centered: true, spread: 2.6 })
@themr(RADIO, theme)
export class Radio extends React.Component<RadioProps> {
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
