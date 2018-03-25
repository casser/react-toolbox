import * as React from "react";
// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr  from '../utils/themr';
import { RADIO } from '../identifiers';
import {ripple} from '../ripple/Ripple';
import { Radio } from './Radio';
import theme from './theme.css';
import ReactToolbox from "components/index";
import {ReactNode} from "react";


export interface RadioButtonTheme {
  /**
   * Added to the root of the Radio in case it's disabled.
   */
  disabled?: string;
  /**
   * Used as the root class of the component.
   */
  field?: string;
  /**
   * Used for the input element.
   */
  input?: string;
  /**
   * Used to style the text label element.
   */
  text?: string;
}

export interface RadioButtonProps extends ReactToolbox.Props {
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
   * If true, the item will be displayed as disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Label for the radio button.
   */
  label?: React.ReactNode;
  /**
   * Name for the input element.
   */
  name?: string;
  /**
   * Callback function that will be invoked when the input is blurred.
   */
  onBlur?: Function;
  /**
   * Callback function that will be invoked when the value changes.
   */
  onChange?: Function;
  /**
   * Callback function that will be invoked when the input is focused.
   */
  onFocus?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: RadioButtonTheme & RadioTheme;
  /**
   * Value for the radio button.
   */
  value?: any;
}


@themr(RADIO, theme)
@ripple({ centered: true, spread: 2.6 })
export class RadioButton extends React.Component<RadioButtonProps> {
  // static propTypes = {
  //   checked: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   label: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.node,
  //   ]),
  //   name: PropTypes.string,
  //   onBlur: PropTypes.func,
  //   onChange: PropTypes.func,
  //   onFocus: PropTypes.func,
  //   onMouseEnter: PropTypes.func,
  //   onMouseLeave: PropTypes.func,
  //   theme: PropTypes.shape({
  //     disabled: PropTypes.string,
  //     field: PropTypes.string,
  //     input: PropTypes.string,
  //     text: PropTypes.string,
  //   }),
  //   value: PropTypes.string,
  // };

  private inputNode:any;

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false,
  };

  handleClick = (event) => {
    const { checked, disabled, onChange } = this.props;
    if (event.pageX !== 0 && event.pageY !== 0) this.blur();
    if (!disabled && !checked && onChange) onChange(event, this);
  };

  blur() {
    if (this.inputNode) {
      this.inputNode.blur();
    }
  }

  focus() {
    if (this.inputNode) {
      this.inputNode.focus();
    }
  }

  render() {
    const {
      checked,
      children,
      className,
      disabled,
      label,
      name,
      onChange, // eslint-disable-line
      onFocus, // eslint-disable-line
      onBlur, // eslint-disable-line
      onMouseEnter,
      onMouseLeave,
      theme,
      ...others
    } = this.props;
    const _className = cn(theme[this.props.disabled ? 'disabled' : 'field'], className);
    return (
      <label
        data-react-toolbox="radio-button"
        className={_className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <input
          {...others}
          checked={checked}
          className={theme.input}
          disabled={disabled}
          name={name}
          onChange={() => {}}
          onClick={this.handleClick}
          ref={(node) => { this.inputNode = node; }}
          type="radio"
        />
        <Radio checked={checked} disabled={disabled} theme={theme} />
        {label ? <span className={theme.text}>{label}</span> : null}
        {children}
      </label>
    );
  }
}


export default RadioButton;

