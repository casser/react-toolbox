import * as React from "react";
// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import time from '../utils/time';
import { Clock } from './Clock';
import { Dialog } from '../dialog/Dialog';
import { TIME_PICKER } from '../identifiers';
import themr  from '../utils/themr';
import theme from './theme.css';

interface TimePickerDialogProps {
  active: boolean;
  cancelLabel: string;
  className: string;
  format: '24hr'|'ampm';
  name: string;
  okLabel: string;
  onDismiss: Function;
  onEscKeyDown: Function;
  onOverlayClick: Function;
  onSelect: Function;
  theme: {
    am?: string;
    amFormat?: string;
    ampm?: string;
    button?: string;
    dialog?: string;
    header?: string;
    hours?: string;
    hoursDisplay?: string;
    minutes?: string;
    minutesDisplay?: string;
    pm?: string;
    pmFormat?: string;
    separator?: string;
    clock?: string;
    clockWrapper?: string;
    placeholder?: string;
    small?: string;
    active?: string;
    face?: string;
    number?: string;
    hand?:string;
    knob?:string
  };
  value: Date
}

interface TimePickerDialogStates {
  display : 'hours' | 'minutes';
  displayTime: Date
}

const defaultDisplay:TimePickerDialogStates['display'] = 'hours';

@themr(TIME_PICKER, theme)
export class TimePickerDialog extends React.Component<TimePickerDialogProps,TimePickerDialogStates> {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   cancelLabel: PropTypes.string,
  //   className: PropTypes.string,
  //   format: PropTypes.oneOf(['24hr', 'ampm']),
  //   name: PropTypes.string,
  //   okLabel: PropTypes.string,
  //   onDismiss: PropTypes.func,
  //   onEscKeyDown: PropTypes.func,
  //   onOverlayClick: PropTypes.func,
  //   onSelect: PropTypes.func,
  //   theme: PropTypes.shape({
  //     am: PropTypes.string,
  //     amFormat: PropTypes.string,
  //     ampm: PropTypes.string,
  //     button: PropTypes.string,
  //     dialog: PropTypes.string,
  //     header: PropTypes.string,
  //     hours: PropTypes.string,
  //     hoursDisplay: PropTypes.string,
  //     minutes: PropTypes.string,
  //     minutesDisplay: PropTypes.string,
  //     pm: PropTypes.string,
  //     pmFormat: PropTypes.string,
  //     separator: PropTypes.string,
  //   }),
  //   value: PropTypes.instanceOf(Date),
  // };

  private clockNode:Clock;

  static defaultProps = {
    active: false,
    cancelLabel: 'Cancel',
    format: '24hr',
    okLabel: 'Ok',
    value: new Date(),
  };

  state = {
    display : defaultDisplay,
    displayTime: new Date(this.props.value.getTime()),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value.getTime() !== this.state.displayTime.getTime()) {
      this.setState({ displayTime: new Date(nextProps.value.getTime()) });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active) {
      setTimeout(() => this.clockNode.handleCalculateShape(), 1000);
    }
  }

  handleClockChange = (value) => {
    this.setState({ displayTime: value });
  };

  handleSelect = (event) => {
    this.props.onSelect(this.state.displayTime, event);
  };

  toggleTimeMode = () => {
    this.setState({ displayTime: time.toggleTimeMode(this.state.displayTime) });
  };

  handleHandMoved = () => {
    if (this.state.display === 'hours') this.setState({ display: 'minutes' });
  };

  switchDisplay = (event) => {
    this.setState({ display: event.target.id });
  };

  actions = [{
    label: this.props.cancelLabel,
    className: this.props.theme.button,
    onClick: this.props.onDismiss,
  }, {
    label: this.props.okLabel,
    className: this.props.theme.button,
    name: this.props.name,
    onClick: this.handleSelect,
  }];

  formatHours() {
    if (this.props.format === 'ampm') {
      return this.state.displayTime.getHours() % 12 || 12;
    }
    return this.state.displayTime.getHours();
  }

  renderAMPMLabels() {
    const { theme } = this.props;
    if (this.props.format !== 'ampm') return undefined;
    return (
      <div className={theme.ampm}>
        <span className={theme.am} onClick={this.toggleTimeMode}>AM</span>
        <span className={theme.pm} onClick={this.toggleTimeMode}>PM</span>
      </div>
    );
  }

  render() {
    const { theme } = this.props;
    const display = `${this.state.display}Display`;
    const format = `${time.getTimeMode(this.state.displayTime)}Format`;
    const className = cn([theme.dialog, theme[display], theme[format]], this.props.className);
    return (
      <Dialog
        actions={this.actions}
        active={this.props.active}
        className={className}
        onEscKeyDown={this.props.onEscKeyDown}
        onOverlayClick={this.props.onOverlayClick}
      >
        <header className={theme.header}>
          <span id="hours" className={theme.hours} onClick={this.switchDisplay}>
            {(`0${this.formatHours()}`).slice(-2)}
          </span>
          <span className={theme.separator}>:</span>
          <span id="minutes" className={theme.minutes} onClick={this.switchDisplay}>
            {(`0${this.state.displayTime.getMinutes()}`).slice(-2)}
          </span>
          {this.renderAMPMLabels()}
        </header>
        <Clock
          ref={(node) => {
            this.clockNode = node;
          }}
          display={this.state.display}
          format={this.props.format}
          onChange={this.handleClockChange}
          onHandMoved={this.handleHandMoved}
          theme={this.props.theme}
          time={this.state.displayTime}
        />
      </Dialog>
    );
  }
}

export default TimePickerDialog;
