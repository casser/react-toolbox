import * as React from "react";
// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr  from '../utils/themr';
import { SWITCH } from '../identifiers';
import { Thumb } from './Thumb';
import theme from './theme.css';
import ReactToolbox from "components/index";
import {ReactNode} from "react";


export interface SwitchTheme {
  /**
   * Used for the root element if the component is disabled.
   */
  disabled?: string;
  /**
   * Used for the root element if the component is not disabled.
   */
  field?: string;
  /**
   * Used for the input element.
   */
  input?: string;
  /**
   * Used for a wrapper around the thumb if checked is false.
   */
  off?: string;
  /**
   * Used for a wrapper around the thumb if checked is true.
   */
  on?: string;
  /**
   * Used for the ripple inside the switch.
   */
  ripple?: string;
  /**
   * Used for the text label element.
   */
  text?: string;
  /**
   * Used for the thumb element.
   */
  thumb?: string;
}

export interface SwitchProps extends ReactToolbox.Props {
  /**
   * If true, the switch will be enabled.
   * @default false
   */
  checked?: boolean;
  /**
   * If true, component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The text string to use for the floating label element.
   */
  label?: string;
  /**
   * The text string used as name of the input.
   */
  name?: string;
  /**
   * Callback function that is fired when when the switch is blurred.
   */
  //onBlur?: Function;
  /**
   * Callback function that is fired when the component's value changes.
   */
  onChange?: Function;
  /**
   * Callback function that is fired when the switch is focused.
   */
  //onFocus?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: SwitchTheme;

  ripple?: boolean;
}


@themr(SWITCH, theme)
// @ripple({centered: true, spread: 2.6})
export class Switch extends React.Component<SwitchProps> {
  // static propTypes = {
  //   checked: PropTypes.bool,
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   label: PropTypes.string,
  //   name: PropTypes.string,
  //   onBlur: PropTypes.func,
  //   onChange: PropTypes.func,
  //   onFocus: PropTypes.func,
  //   ripple: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     disabled: PropTypes.string,
  //     field: PropTypes.string,
  //     input: PropTypes.string,
  //     off: PropTypes.string,
  //     on: PropTypes.string,
  //     ripple: PropTypes.string,
  //     text: PropTypes.string,
  //     thumb: PropTypes.string,
  //   }),
  // };

  private inputNode:any;

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false,
  };

  handleToggle = (event) => {
    console.info("handle change");
    if (event.pageX !== 0 && event.pageY !== 0) this.blur();
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(!this.props.checked, event);
    }
  };

  blur() {
    this.inputNode.blur();
  }

  focus() {
    this.inputNode.focus();
  }
  render() {
    const {
      checked,
      className,
      disabled,
      onChange, // eslint-disable-line no-unused-vars
      ripple,
      theme,
      ...others
    } = this.props;
    const _className = cn(theme[disabled ? 'disabled' : 'field'], className);
    return (
      <label data-react-toolbox="switch" className={_className}>
        <input
          {...others}
          checked={this.props.checked}
          className={theme.input}
          onClick={this.handleToggle}
          //readOnly
          ref={(node) => {
            this.inputNode = node;
          }}
          type="checkbox"
        />
        <span className={theme[checked ? 'on' : 'off']}>
          <Thumb disabled={this.props.disabled} theme={theme} ripple={ripple} />
        </span>
        {this.props.label ? <span className={theme.text}>{this.props.label}</span> : null}
      </label>
    );
  }
}

export default Switch;

