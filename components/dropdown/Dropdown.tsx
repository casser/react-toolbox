import * as React from "react";
import ReactToolbox from "../types";

import ReactDOM from 'react-dom';
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import {DROPDOWN} from '../identifiers';
import {Input} from '../input/Input';
import events from '../utils/events';
import theme from './theme.css';


export interface DropdownTheme {
  /**
   * Added to the root element when the dropdown is active.
   */
  active?: string;
  /**
   * Added to the root element when it's disabled.
   */
  disabled?: string;
  /**
   * Root element class.
   */
  dropdown?: string;
  /**
   * Used for the error element.
   */
  error?: string;
  /**
   * Added to the inner wrapper if it's errored.
   */
  errored?: string;
  /**
   * Used for the inner wrapper of the component.
   */
  field?: string;
  /**
   * Used for the the label element.
   */
  label?: string;
  /**
   * Used when dropdown has required attribute.
   */
  required?: string;
  /**
   * Used to highlight the selected value.
   */
  selected?: string;
  /**
   * Used as a wrapper for the given template value.
   */
  templateValue?: string;
  /**
   * Added to the root element when it's opening up.
   */
  up?: string;
  /**
   * Used for each value in the dropdown component.
   */
  value?: string;
  /**
   * Used for the list of values.
   */
  values?: string;
}

export interface DropdownProps extends ReactToolbox.Props {
  /**
   * If true the dropdown will preselect the first item if the supplied value matches none of the options' values.
   * @default true
   */
  allowBlank?: boolean;
  /**
   * If true, the dropdown will open up or down depending on the position in the screen.
   * @default true
   */
  auto?: boolean;
  /**
   * Set the component as disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Give an error string to display under the field.
   */
  error?: string;
  /**
   * The text string to use for the floating label element.
   */
  label?: string;
  /**
   * Used for setting the label from source
   */
  labelKey?: string;
  /**
   * Name for the input field.
   */
  name?: string;
  /**
   * Callback function that is fired when the component is blurred.
   */
  onBlur?: Function;
  /**
   * Callback function that is fired when the component's value changes.
   */
  onChange?: Function;
  /**
   * Callback function that is fired when the component is focused.
   */
  onFocus?: Function;
  /**
   * If true, the dropdown has a required attribute.
   * @default false
   */
  required?: boolean;
  /**
   * Array of data objects with the data to represent in the dropdown.
   */
  source: any[];
  /**
   * Callback function that returns a JSX template to represent the element.
   */
  template?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: DropdownTheme;
  /**
   * Default value using JSON data.
   */
  value?: string | number;
  /**
   * Used for setting the value from source
   */
  valueKey?: string;
}

@themr(DROPDOWN, theme)
export class Dropdown extends React.Component<DropdownProps> {
  // static propTypes = {
  //   allowBlank: PropTypes.bool,
  //   auto: PropTypes.bool,
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   error: PropTypes.string,
  //   label: PropTypes.string,
  //   labelKey: PropTypes.string,
  //   name: PropTypes.string,
  //   onBlur: PropTypes.func,
  //   onChange: PropTypes.func,
  //   onClick: PropTypes.func,
  //   onFocus: PropTypes.func,
  //   required: PropTypes.bool,
  //   source: PropTypes.arrayOf(PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.object,
  //   ])).isRequired,
  //   template: PropTypes.func,
  //   theme: PropTypes.shape({
  //     active: PropTypes.string,
  //     disabled: PropTypes.string,
  //     dropdown: PropTypes.string,
  //     error: PropTypes.string,
  //     errored: PropTypes.string,
  //     field: PropTypes.string,
  //     label: PropTypes.string,
  //     required: PropTypes.string,
  //     selected: PropTypes.string,
  //     templateValue: PropTypes.string,
  //     up: PropTypes.string,
  //     value: PropTypes.string,
  //     values: PropTypes.string,
  //   }),
  //   value: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.number,
  //   ]),
  //   valueKey: PropTypes.string,
  // };

  static defaultProps = {
    auto: true,
    className: '',
    allowBlank: true,
    disabled: false,
    labelKey: 'label',
    required: false,
    valueKey: 'value',
  };

  state = {
    active: false,
    up: false,
  };

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.active && nextState.active) {
      events.addEventsToDocument(this.getDocumentEvents());
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.active && !this.state.active) {
      events.removeEventsFromDocument(this.getDocumentEvents());
    }
  }

  componentWillUnmount() {
    if (this.state.active) {
      events.removeEventsFromDocument(this.getDocumentEvents());
    }
  }

  getDocumentEvents = () => ({
    click: this.handleDocumentClick,
    touchend: this.handleDocumentClick,
  });

  getSelectedItem = () => {
    for (const item of this.props.source) {
      if (item[this.props.valueKey] === this.props.value) return item;
    }
    return !this.props.allowBlank
      ? this.props.source[0]
      : undefined;
  };

  handleSelect = (item, event) => {
    if (this.props.onBlur) this.props.onBlur(event);
    if (!this.props.disabled && this.props.onChange) {
      if (this.props.name) event.target.name = this.props.name;
      this.props.onChange(item, event);
      this.close();
    }
  };

  handleClick = (event) => {
    this.open(event);
    events.pauseEvent(event);
    if (this.props.onClick) this.props.onClick(event);
  };

  handleDocumentClick = (event) => {
    if (this.state.active && !events.targetIsDescendant(event, ReactDOM.findDOMNode(this))) {
      this.setState({active: false});
    }
  };

  close = () => {
    if (this.state.active) {
      this.setState({active: false});
    }
  };

  open = (event) => {
    if (this.state.active) return;
    const client = event.target.getBoundingClientRect();
    const screenHeight = window.innerHeight || document.documentElement.offsetHeight;
    const up = this.props.auto ? client.top > ((screenHeight / 2) + client.height) : false;
    this.setState({active: true, up});
  };

  handleFocus = (event) => {
    event.stopPropagation();
    if (!this.props.disabled) this.open(event);
    if (this.props.onFocus) this.props.onFocus(event);
  };

  handleBlur = (event) => {
    event.stopPropagation();
    if (this.state.active) this.close();
    if (this.props.onBlur) this.props.onBlur(event);
  };

  renderTemplateValue(selected) {
    const {theme} = this.props;
    const className = classnames(theme.field, {
      [theme.errored]: this.props.error,
      [theme.disabled]: this.props.disabled,
      [theme.required]: this.props.required,
    });

    return (
      <div className={className} onClick={this.handleClick}>
        <div className={`${theme.templateValue} ${theme.value}`}>
          {this.props.template(selected)}
        </div>
        {this.props.label
          ? (
            <label className={theme.label}>
              {this.props.label}
              {this.props.required ? <span className={theme.required}> * </span> : null}
            </label>
          ) : null}
        {this.props.error ? <span className={theme.error}>{this.props.error}</span> : null}
      </div>
    );
  }

  renderValue = (item, idx) => {
    const {labelKey, theme, valueKey} = this.props;
    const className = classnames({
      [theme.selected]: item[valueKey] === this.props.value,
      [theme.disabled]: item.disabled,
    });
    return (
      <li
        key={idx}
        className={className}
        onMouseDown={!item.disabled && this.handleSelect.bind(this, item[valueKey])}
      >
        {this.props.template ? this.props.template(item) : item[labelKey]}
      </li>
    );
  };

  render() {
    const {
      allowBlank, auto, labelKey, required, onChange, onFocus, onBlur, // eslint-disable-line no-unused-vars
      source, template, theme, valueKey, ...others
    } = this.props;
    const selected = this.getSelectedItem();
    const className = classnames(theme.dropdown, {
      [theme.up]: this.state.up,
      [theme.active]: this.state.active,
      [theme.disabled]: this.props.disabled,
      [theme.required]: this.props.required,
    }, this.props.className);

    return (
      <div
        className={className}
        data-react-toolbox="dropdown"
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        tabIndex={-1}
      >
        <Input
          {...others}
          tabIndex={0}
          className={theme.value}
          onClick={this.handleClick}
          required={this.props.required}
          readOnly
          type={template && selected ? 'hidden' : null}
          theme={theme}
          themeNamespace="input"
          value={selected && selected[labelKey] ? selected[labelKey] : ''}
        />
        {template && selected ? this.renderTemplateValue(selected) : null}
        <ul className={theme.values}>
          {source.map(this.renderValue)}
        </ul>
      </div>
    );
  }
}

export default Dropdown;
