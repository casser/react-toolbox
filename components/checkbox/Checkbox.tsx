import * as React from "react";
import ReactToolbox from "../types";
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { CHECKBOX } from '../identifiers';
import theme from './theme.css';
import { Check } from './Check';

@themr(CHECKBOX, theme)
export class Checkbox extends React.Component<CheckboxProps, {}> {
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
  //   onChange: PropTypes.func,
  //   onMouseEnter: PropTypes.func,
  //   onMouseLeave: PropTypes.func,
  //   style: PropTypes.object,
  //   theme: PropTypes.shape({
  //     disabled: PropTypes.string,
  //     field: PropTypes.string,
  //     input: PropTypes.string,
  //     ripple: PropTypes.string,
  //   }),
  // };

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false,
  };
  private inputNode:HTMLInputElement;
  handleToggle = (event) => {
    if (event.pageX !== 0 && event.pageY !== 0) this.blur();
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(!this.props.checked, event);
    }
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
    const { checked, children, disabled, label, name, style, onChange, // eslint-disable-line
      onMouseEnter, onMouseLeave, theme, ...others } = this.props;
    const className = classnames(theme.field, {
      [theme.disabled]: this.props.disabled,
    }, this.props.className);

    return (
      <label
        data-react-toolbox="checkbox"
        className={className}
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
          onClick={this.handleToggle}
          ref={(node) => { this.inputNode = node; }}
          type="checkbox"
        />
        <Check
          checked={checked}
          disabled={disabled}
          rippleClassName={theme.ripple}
          style={style}
          theme={theme}
        />
        {label ? <span data-react-toolbox="label" className={theme.text}>{label}</span> : null}
        {children}
      </label>
    );
  }
}
export interface CheckboxTheme {
  /**
   * Used as root in the check element.
   */
  check?: string;
  /**
   * Used for the check element when it's checked.
   */
  checked?: string;
  /**
   * Used when the component is disabled.
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
   * Used for the ripple component.
   */
  ripple?: string;
  /**
   * Used for the text label.
   */
  text?: string;
}
export interface CheckboxProps extends ReactToolbox.Props {
  /**
   * Value for the checkbox, can be true or false.
   * @default false
   */
  checked?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the checkbox shown as disabled and cannot be modified.
   * @default false
   */
  disabled?: boolean;
  /**
   * Text label to attach next to the checkbox element.
   */
  label?: React.ReactNode;
  /**
   * The name of the field to set in the input checkbox.
   */
  name?: string;
  /**
   * Callback called when the checkbox is blurred.
   */
  onBlur?: React.ReactEventHandler<HTMLInputElement>;
  /**
   * Callback called when the checkbox value is changed.
   */
  onChange?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: CheckboxTheme;
  /**
   * Additional properties passed to inner input element.
   */
  [key: string]: any;
}
