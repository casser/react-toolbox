import * as React from "react";
// import PropTypes from 'prop-types';
import themr  from '../utils/themr';
import { RADIO } from '../identifiers';
import { RadioButton } from './RadioButton';
import isComponentOfType from '../utils/is-component-of-type';
import theme from './theme.css';
import ReactToolbox from "../types";

export interface RadioGroupProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the group will be displayed as disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Name for the input element group.
   */
  name?: string;
  /**
   * Callback function that will be invoked when the value changes.
   */
  onChange?: Function;
  /**
   * Default value selected in the radio group.
   */
  value?: any;
}


@themr(RADIO, theme)
export class RadioGroup extends React.Component<RadioGroupProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   onChange: PropTypes.func,
  //   value: PropTypes.string,
  // };

  static defaultProps = {
    className: '',
    disabled: false,
  };

  handleChange = (value, event) => {
    if (this.props.onChange) this.props.onChange(value, event);
  };

  renderRadioButtons() {
    return React.Children.map(this.props.children, (child:React.ReactElement<any>,) => (
      !isComponentOfType(RadioButton, child)
        ? child
        : React.cloneElement(child, {
          checked: child.props.value === this.props.value,
          disabled: this.props.disabled || child.props.disabled,
          onChange: this.handleChange.bind(this, child.props.value),
        })
    ));
  }

  render() {
    return (
      <div data-react-toolbox="radio-group" className={this.props.className}>
        {this.renderRadioButtons()}
      </div>
    );
  }
}
export default RadioGroup;

