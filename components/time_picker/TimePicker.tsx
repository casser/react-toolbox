import * as React from "react";
// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr  from '../utils/themr';
import { TIME_PICKER } from '../identifiers';
import events from '../utils/events';
import time from '../utils/time';
import { Input } from '../input/Input';
import { TimePickerDialog } from './TimePickerDialog';
import theme from './theme.css';


//todo : revisit properties and theme definitions
export interface TimePickerTheme {
  /**
   * Added to the number which is active in clock face.
   */
  active?: string;
  /**
   * AM label in dialog header when mode is AM/PM.
   */
  am?: string;
  /**
   * Added to the dialog when the selected format is AM.
   */
  amFormat?: string;
  /**
   * Wrapper for AM and PM labels in header when mode is AM/PM.
   */
  ampm?: string;
  /**
   * Used for buttons inside the dialog of the picker.
   */
  button?: string;
  /**
   * Clock root class element.
   */
  clock?: string;
  /**
   * Wrapper for the proper positioning of the clock.
   */
  clockWrapper?: string;
  /**
   * Used for the dialog component.
   */
  dialog?: string;
  /**
   * Used to style the clock face.
   */
  face?: string;
  /**
   * Used for the clock's hand.
   */
  hand?: string;
  /**
   * Dialog header wrapper class.
   */
  header?: string;
  /**
   * Used for hours in dialog header.
   */
  hours?: string;
  /**
   * Added to the dialog hours are displayed.
   */
  hoursDisplay?: string;
  /**
   * Used for Input element that opens the picker.
   */
  input?: string;
  /**
   * Used for the knob of the hand.
   */
  knob?: string;
  /**
   * Used for minutes in dialog header.
   */
  minutes?: string;
  /**
   * Added to the dialog minutes are displayed.
   */
  minutesDisplay?: string;
  /**
   * Each of the numbers in the clock's face.
   */
  number?: string;
  /**
   * Placeholder for the clock inside the dialog (inner wrapper).
   */
  placeholder?: string;
  /**
   * PM label in dialog header when mode is AM/PM.
   */
  pm?: string;
  /**
   * Added to the dialog when the selected format is PM.
   */
  pmFormat?: string;
  /**
   * Is the : separator between hours and minutes in dialog header.
   */
  separator?: string;
  /**
   * Added to the knob when no round number is selected.
   */
  small?: string;
  container?:string;
}
export interface TimePickerProps {
  /**
   * Whether time picker is active.
   * @default false
   */
  active?: boolean;
  /**
   * Label used for cancel button.
   * @default "Cancel"
   */
  cancelLabel?: string;
  /**
   * Provide error text which will be displayed under the field.
   */
  error?: string;
  /**
   * A key to identify an Icon from Material Design Icons or a custom Icon Element.
   */
  icon?: React.ReactNode;
  /**
   * This class will be applied to Input component of TimePicker.
   */
  inputClassName?: string;
  /**
   * Format to display the clock. It can be 24hr or ampm.
   * @default "24hr"
   */
  format?: "24hr" | "ampm";
  /**
   * The text string to use for the floating label element in the input component.
   */
  label?: string;
  /**
   * Label used for 'OK' button on Dialog.
   * @default "Ok"
   */
  okLabel?: string;
  /**
   * Callback called when the picker value is changed.
   */
  onChange?: Function;
  /**
   * Callback fired on Input click.
   */
  onClick?: Function;
  /**
   * Callback fired after dismissing the Dialog.
   */
  onDismiss?: Function;
  /**
   * Callback called when the ESC key is pressed with the overlay active.
   */
  onEscKeyDown?: Function;
  /**
   * Callback invoked on Input key press.
   */
  onKeyPress?: Function;
  /**
   * Callback to be invoked when the dialog overlay is clicked.
   */
  onOverlayClick?: Function;
  /**
   * The input element will be readonly and look like disabled.
   */
  readonly?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: TimePickerTheme;
  /**
   * Datetime object with currrently selected time.
   */
  value?: Date;
  /**
   * Additional attributes passed to inner Input component.
   */
  [key: string]: any;
}

@themr(TIME_PICKER, theme)
export class TimePicker extends React.Component<TimePickerProps> {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   cancelLabel: PropTypes.string,
  //   className: PropTypes.string,
  //   error: PropTypes.string,
  //   format: PropTypes.oneOf(['24hr', 'ampm']),
  //   inputClassName: PropTypes.string,
  //   label: PropTypes.string,
  //   name: PropTypes.string,
  //   okLabel: PropTypes.string,
  //   onChange: PropTypes.func,
  //   onClick: PropTypes.func,
  //   onDismiss: PropTypes.func,
  //   onEscKeyDown: PropTypes.func,
  //   onKeyPress: PropTypes.func,
  //   onOverlayClick: PropTypes.func,
  //   readonly: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     container: PropTypes.string,
  //     input: PropTypes.string,
  //   }),
  //   value: PropTypes.instanceOf(Date),
  // };

  static defaultProps = {
    active: false,
    className: '',
    format: '24hr',
  };

  state = {
    active: this.props.active,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active && this.state.active !== nextProps.active) {
      this.setState({ active: nextProps.active });
    }
  }

  handleDismiss = () => {
    this.setState({ active: false });
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  };

  handleInputFocus = (event) => {
    events.pauseEvent(event);
    this.setState({ active: true });
  };

  handleInputBlur = (event) => {
    events.pauseEvent(event);
    this.setState({ active: false });
  };

  handleInputClick = (event) => {
    events.pauseEvent(event);
    this.setState({ active: true });
    if (this.props.onClick) this.props.onClick(event);
  };

  handleInputKeyPress = (event) => {
    if (event.charCode === 13) {
      events.pauseEvent(event);
      this.setState({ active: true });
    }
    if (this.props.onKeyPress) this.props.onKeyPress(event);
  };

  handleSelect = (value, event) => {
    if (this.props.onChange) this.props.onChange(value, event);
    this.setState({ active: false });
  };

  render() {
    const {
      active, onDismiss, // eslint-disable-line
      cancelLabel, format, inputClassName, okLabel, onEscKeyDown, onOverlayClick,
      readonly, value, ...others
    } = this.props;
    const formattedTime = value ? time.formatTime(value, format) : '';
    return (
      <div data-react-toolbox="time-picker" className={this.props.theme.container}>
        <Input
          {...others}
          className={cn(this.props.theme.input, { [inputClassName]: inputClassName })}
          disabled={readonly}
          error={this.props.error}
          label={this.props.label}
          name={this.props.name}
          onKeyPress={this.handleInputKeyPress}
          onClick={this.handleInputClick}
          //readOnly
          type="text"
          value={formattedTime}
        />
        <TimePickerDialog
          active={this.state.active}
          cancelLabel={cancelLabel}
          className={this.props.className}
          format={format}
          name={this.props.name}
          okLabel={okLabel}
          onDismiss={this.handleDismiss}
          onEscKeyDown={onEscKeyDown || this.handleDismiss}
          onOverlayClick={onOverlayClick || this.handleDismiss}
          onSelect={this.handleSelect}
          theme={this.props.theme}
          value={this.props.value}
        />
      </div>
    );
  }
}
export default TimePicker;
