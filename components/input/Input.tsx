import * as React from "react";
import ReactToolbox from "../types";

import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { isValuePresent } from '../utils/utils';
import { INPUT } from '../identifiers';
import { FontIcon } from '../font_icon/FontIcon';
import theme from './theme.css';

export interface InputTheme {
  /**
   * Used for the bar under the input.
   */
  bar?: string;
  /**
   * Used for the counter element.
   */
  counter?: string;
  /**
   * Added to the root class when input is disabled.
   */
  disabled?: string;
  /**
   * Used for the text error.
   */
  error?: string;
  /**
   * Added to the root class when input is errored.
   */
  errored?: string;
  /**
   * Used when the input is hidden.
   */
  hidden?: string;
  /**
   * Used for the hint text.
   */
  hint?: string;
  /**
   * Used for the icon in case the input has icon.
   */
  icon?: string;
  /**
   * Used as root class for the component.
   */
  input?: string;
  /**
   * Used for the HTML input element.
   */
  inputElement?: string;
  /**
   * Used for the label when the input has a label.
   */
  label?: string;
  /**
   * Used in case the input is required.
   */
  required?: string;
  /**
   * Added to the root class if the input has icon.
   */
  withIcon?: string;
  fixed?: string;
  filled?: string;
}
export interface InputProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Give an error node to display under the field.
   */
  error?: React.ReactNode;
  /**
   * Indicates if the label is floating in the input field or not.
   * @default true
   */
  floating?: boolean;
  /**
   * The text string to use for hint text element.
   */
  hint?: React.ReactNode;
  /**
   * Name of an icon to use as a label for the input.
   */
  icon?: React.ReactNode;
  /**
   * The text string to use for the floating label element.
   */
  label?: React.ReactNode;
  /**
   * Specifies the maximum number of characters allowed in the component
   */
  maxLength?: number;
  /**
   * If true, a textarea element will be rendered. The textarea also grows and shrinks according to the number of lines.
   * @default false
   */
  multiline?: boolean;
  /**
   * Name for the input field.
   */
  name?: string;
  /**
   * Callback function that is fired when component is blurred.
   */
  onBlur?: Function;
  /**
   * Callback function that is fired when the component's value changes
   */
  onChange?: Function;
  /**
   * Callback function that is fired when component is focused.
   */
  onFocus?: Function;
  /**
   * Callback function that is fired when a key is pressed down.
   */
  onKeyDown?: Function;
  /**
   * Callback function that is fired when a key is released.
   */
  onKeyUp?: Function;
  /**
   * Callback function that is fired when a key is pressed.
   */
  onKeyPress?: Function;
  /**
   * If true, the html input has a required attribute.
   * @default false
   */
  required?: boolean;
  /**
   * The number of rows the multiline input field has.
   */
  rows?: number;
  /**
   * Classnames object defining the component style.
   */
  theme?: InputTheme;
  themeNamespace?: string;
  /**
   * Type of the input element. It can be a valid HTML5 input type.
   * @default "text"
   */
  type?: string;
  /**
   * Current value of the input element.
   */
  value?: any;
  /**
   * Autocomplete props
   */
  autoComplete?: "off" | "on";
  /**
   * Is read only input
   */
  readOnly?: boolean;
  tabIndex?: number;

  defaultValue?: any;
  role?: string;
}

@themr(INPUT, theme)
export class Input extends React.Component<InputProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   defaultValue: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   error: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.node,
  //   ]),
  //   floating: PropTypes.bool,
  //   hint: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.node,
  //   ]),
  //   icon: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   label: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.node,
  //   ]),
  //   maxLength: PropTypes.number,
  //   multiline: PropTypes.bool,
  //   name: PropTypes.string,
  //   onBlur: PropTypes.func,
  //   onChange: PropTypes.func,
  //   onFocus: PropTypes.func,
  //   onKeyPress: PropTypes.func,
  //   required: PropTypes.bool,
  //   role: PropTypes.string,
  //   rows: PropTypes.number,
  //   theme: PropTypes.shape({
  //     bar: PropTypes.string,
  //     counter: PropTypes.string,
  //     disabled: PropTypes.string,
  //     error: PropTypes.string,
  //     errored: PropTypes.string,
  //     hidden: PropTypes.string,
  //     hint: PropTypes.string,
  //     icon: PropTypes.string,
  //     input: PropTypes.string,
  //     inputElement: PropTypes.string,
  //     required: PropTypes.string,
  //     withIcon: PropTypes.string,
  //   }),
  //   type: PropTypes.string,
  //   value: PropTypes.oneOfType([
  //     PropTypes.number,
  //     PropTypes.object,
  //     PropTypes.string,
  //   ]),
  // };

  static defaultProps = {
    className: '',
    hint: '',
    disabled: false,
    floating: true,
    multiline: false,
    required: false,
    role: 'input',
    type: 'text',
  };
  private inputNode;
  componentDidMount() {
    if (this.props.multiline) {
      window.addEventListener('resize', this.handleAutoresize);
      this.handleAutoresize();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.multiline && nextProps.multiline) {
      window.addEventListener('resize', this.handleAutoresize);
    } else if (this.props.multiline && !nextProps.multiline) {
      window.removeEventListener('resize', this.handleAutoresize);
    }
  }

  componentDidUpdate() {
    // resize the textarea, if nessesary
    if (this.props.multiline) {
      this.handleAutoresize();
    }
  }

  componentWillUnmount() {
    if (this.props.multiline) {
      window.removeEventListener('resize', this.handleAutoresize);
    }
  }

  handleChange = (event) => {
    const { onChange, multiline, maxLength } = this.props;
    const valueFromEvent = event.target.value;

    // Trim value to maxLength if that exists (only on multiline inputs).
    // Note that this is still required even tho we have the onKeyPress filter
    // because the user could paste smt in the textarea.
    const haveToTrim = (multiline && maxLength && event.target.value.length > maxLength);
    const value = haveToTrim ? valueFromEvent.substr(0, maxLength) : valueFromEvent;

    // propagate to to store and therefore to the input
    if (onChange) {
      onChange(value, event);
    }
  };

  handleAutoresize = () => {
    const element = this.inputNode;
    const rows = this.props.rows;

    if (typeof rows === 'number' && !isNaN(rows)) {
      element.style.height = null;
    } else {
      // compute the height difference between inner height and outer height
      const style = getComputedStyle(element, null);
      const heightOffset = style.boxSizing === 'content-box'
        ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))
        : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

      // resize the input to its content size
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight + heightOffset}px`;
    }
  };

  handleKeyPress = (event) => {
    // prevent insertion of more characters if we're a multiline input
    // and maxLength exists
    const { multiline, maxLength, onKeyPress } = this.props;
    if (multiline && maxLength) {
      // check if smt is selected, in which case the newly added charcter would
      // replace the selected characters, so the length of value doesn't actually
      // increase.
      const isReplacing = event.target.selectionEnd - event.target.selectionStart;
      const value = event.target.value;

      if (!isReplacing && value.length === maxLength) {
        event.preventDefault();
        event.stopPropagation();
        return undefined;
      }
    }

    if (onKeyPress) {
      onKeyPress(event);
    }
    return undefined;
  };

  blur() {
    this.inputNode.blur();
  }

  focus() {
    this.inputNode.focus();
  }

  render() {
    const {
      children, defaultValue, disabled, error, floating, hint, icon,
      name, label: labelText, maxLength, multiline, required, role,
      theme, type, value, onKeyPress, rows = 1, ...others
    } = this.props;
    const length = maxLength && value ? value.length : 0;
    const labelClassName = classnames(theme.label, { [ theme.fixed ]: !floating });

    const className = classnames(theme.input, {
      [ theme.disabled ]: disabled,
      [ theme.errored ]: error,
      [ theme.hidden ]: type === 'hidden',
      [ theme.withIcon ]: icon,
    }, this.props.className);

    const valuePresent = isValuePresent(value) || isValuePresent(defaultValue);

    const inputElementProps: any = {
      ...others,
      className: classnames(theme.inputElement, { [ theme.filled ]: valuePresent }),
      onChange: this.handleChange,
      ref: (node) => {
        this.inputNode = node;
      },
      role,
      name,
      defaultValue,
      disabled,
      required,
      type,
      value,
    };
    if (!multiline) {
      inputElementProps.maxLength = maxLength;
      inputElementProps.onKeyPress = onKeyPress;
    } else {
      inputElementProps.rows = rows;
      inputElementProps.onKeyPress = this.handleKeyPress;
    }

    return (
      <div data-react-toolbox="input" className={className}>
        {React.createElement(multiline ? 'textarea' : 'input', inputElementProps)}
        {icon ? <FontIcon className={theme.icon} value={icon}/> : null}
        <span className={theme.bar}/>
        {labelText
          ? <label className={labelClassName}>
            {labelText}
            {required ? <span className={theme.required}> * </span> : null}
          </label>
          : null}
        {hint ? <span hidden={!!labelText} className={theme.hint}>{hint}</span> : null}
        {error ? <span className={theme.error}>{error}</span> : null}
        {maxLength ? <span className={theme.counter}>{length}/{maxLength}</span> : null}
        {children}
      </div>
    );
  }
}
export default Input;
