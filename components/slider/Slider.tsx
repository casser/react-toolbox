import * as React from "react";
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { round, range } from '../utils/utils';
import { SLIDER } from '../identifiers';
import events from '../utils/events';
import { ProgressBar } from '../progress_bar/ProgressBar';
import { Input } from '../input/Input';
import theme from './theme.css';
import ReactToolbox from "../types";
import {ReactNode} from "react";

export interface SliderTheme {
  /**
   * Used as an inner container of the root component.
   */
  container?: string;
  /**
   * Added to the root of in case the Slider is editable.
   */
  editable?: string;
  /**
   * Used to style the inner element of the knob.
   */
  innerknob?: string;
  /**
   * Provided to the ProgressBar component.
   */
  innerprogress?: string;
  /**
   * Provided to the Input element in case it's editable.
   */
  input?: string;
  /**
   * Used to style the outer layer of the knob.
   */
  knob?: string;
  /**
   * Added to the root in case the Slider is pinned.
   */
  pinned?: string;
  /**
   * Added to the root in case the state is pressed.
   */
  pressed?: string;
  /**
   * Used as an outer wrapper for the ProgressBar.
   */
  progress?: string;
  /**
   * Used in the root when the knob should be a ring.
   */
  ring?: string;
  /**
   * Class used for the root element.
   */
  slider?: string;
  /**
   * Used for every individual snap element.
   */
  snap?: string;
  /**
   * Used as a wrapper for the group of snaps when it's snapped.
   */
  snaps?: string;

  disabled?:any
}

export interface SliderProps extends ReactToolbox.Props {
  /**
   * If true, an input is shown and the user can set the slider from keyboard value.
   * @default false
   */
  editable?: boolean;
  /**
   * If true, component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Maximum value permitted.
   * @default 100
   */
  max?: number;
  /**
   * Minimum value permitted.
   * @default 0
   */
  min?: number;
  /**
   * Callback function that will be invoked when the slider value changes.
   */
  onChange?: Function;
  /**
   * Callback function that will be invoked when the slider starts being dragged.
   */
  //onDragStart?: Function;
  /**
   * Callback function that will be invoked when the slider stops being dragged.
   */
  onDragStop?: Function;
  /**
   * If true, a pin with numeric value label is shown when the slider thumb is pressed. Use for settings for which users need to know the exact value of the setting.
   * @default false
   */
  pinned?: boolean;
  /**
   * If true, the slider thumb snaps to tick marks evenly spaced based on the step property value.
   * @default false
   */
  snaps?: boolean;
  /**
   * Amount to vary the value when the knob is moved or increase/decrease is called.
   * @default 0.01
   */
  step?: number;
  /**
   * Classnames object defining the component style.
   */
  theme?: SliderTheme;
  /**
   * Current value of the slider.
   * @default 0
   */
  value?: number;

  /**
   * Used to style the ProgressBar element
   */
  buffer?: number;
}

interface SliderStates{
  inputFocused: boolean;
  inputValue: any;
  sliderLength: number;
  sliderStart: number;
  pressed?:boolean
}

const KEYS = {
  ENTER: 'Enter',
  ESC: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
};

@themr(SLIDER, theme)
export class Slider extends React.Component<SliderProps,SliderStates> {
  // static propTypes = {
  //   buffer: PropTypes.number,
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   editable: PropTypes.bool,
  //   max: PropTypes.number,
  //   min: PropTypes.number,
  //   onChange: PropTypes.func,
  //   onDragStart: PropTypes.func,
  //   onDragStop: PropTypes.func,
  //   pinned: PropTypes.bool,
  //   snaps: PropTypes.bool,
  //   step: PropTypes.number,
  //   style: PropTypes.object,
  //   theme: PropTypes.shape({
  //     container: PropTypes.string,
  //     editable: PropTypes.string,
  //     innerknob: PropTypes.string,
  //     innerprogress: PropTypes.string,
  //     input: PropTypes.string,
  //     knob: PropTypes.string,
  //     pinned: PropTypes.string,
  //     pressed: PropTypes.string,
  //     progress: PropTypes.string,
  //     ring: PropTypes.string,
  //     slider: PropTypes.string,
  //     snap: PropTypes.string,
  //     snaps: PropTypes.string,
  //   }),
  //   value: PropTypes.number,
  // };

  static defaultProps = {
    buffer: 0,
    className: '',
    editable: false,
    max: 100,
    min: 0,
    onDragStart: () => {
    },
    onDragStop: () => {
    },
    pinned: false,
    snaps: false,
    step: 0.01,
    value: 0,
  };


  private knobNode:ReactNode;
  private sliderNode:ReactNode;
  private inputNode:Input;
  private progressbarNode:ProgressBar;

  state = {
    inputFocused: false,
    inputValue: null,
    sliderLength: 0,
    sliderStart: 0,
    pressed:false
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.inputFocused && this.props.value !== nextProps.value) {
      this.setState({ inputValue: this.valueForInput(nextProps.value) });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.inputFocused || !nextState.inputFocused;
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.pressed !== this.state.pressed) {
      if (nextState.pressed) {
        this.props.onDragStart(nextProps);
      } else {
        this.props.onDragStop();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    events.removeEventsFromDocument(this.getMouseEventMap());
    events.removeEventsFromDocument(this.getTouchEventMap());
    events.removeEventsFromDocument(this.getKeyboardEvents());
  }

  getKeyboardEvents() {
    return {
      keydown: this.handleKeyDown,
    };
  }

  getMouseEventMap() {
    return {
      mousemove: this.handleMouseMove,
      mouseup: this.handleMouseUp,
    };
  }

  getTouchEventMap() {
    return {
      touchmove: this.handleTouchMove,
      touchend: this.handleTouchEnd,
    };
  }

  addToValue(increment) {
    let value = this.state.inputFocused ? parseFloat(this.state.inputValue) : this.props.value;
    value = this.trimValue(value + increment);
    if (value !== this.props.value) this.props.onChange(value);
  }

  handleInputFocus = () => {
    this.setState({
      inputFocused: true,
      inputValue: this.valueForInput(this.props.value),
    });
  };

  handleInputChange = (value) => {
    this.setState({ inputValue: value });
  };

  handleInputBlur = (event) => {
    const value = this.state.inputValue || 0;
    this.setState({ inputFocused: false, inputValue: null }, () => {
      this.props.onChange(this.trimValue(value), event);
    });
  };

  handleKeyDown = (event) => {
    const { disabled, step } = this.props;
    const { ARROW_DOWN, ARROW_UP, ENTER, ESC } = KEYS;

    if (disabled) return;
    if ([ENTER, ESC].includes(event.code)) this.inputNode.blur();
    if (event.code === ARROW_UP) this.addToValue(step);
    if (event.code === ARROW_DOWN) this.addToValue(-step);
  };

  handleMouseDown = (event) => {
    if (this.state.inputFocused) this.inputNode.blur();
    events.addEventsToDocument(this.getMouseEventMap());
    this.start(events.getMousePosition(event));
    events.pauseEvent(event);
  };

  handleMouseMove = (event) => {
    events.pauseEvent(event);
    this.move(events.getMousePosition(event));
  };

  handleMouseUp = () => {
    this.end(this.getMouseEventMap());
  };

  handleResize = (event?, callback?) => {
    const { left, right } = ReactDOM.findDOMNode(this.progressbarNode).getBoundingClientRect();
    const cb = (callback) || (() => {
    });
    this.setState({ sliderStart: left, sliderLength: right - left }, cb);
  };

  handleSliderBlur = () => {
    events.removeEventsFromDocument(this.getKeyboardEvents());
  };

  handleSliderFocus = () => {
    events.addEventsToDocument(this.getKeyboardEvents());
  };

  handleTouchEnd = () => {
    this.end(this.getTouchEventMap());
  };

  handleTouchMove = (event) => {
    this.move(events.getTouchPosition(event));
  };

  handleTouchStart = (event) => {
    if (this.state.inputFocused) this.inputNode.blur();
    this.start(events.getTouchPosition(event));
    events.addEventsToDocument(this.getTouchEventMap());
    events.pauseEvent(event);
  };

  end(revents) {
    events.removeEventsFromDocument(revents);
    this.setState({ pressed: false });
  }

  knobOffset() {
    const { max, min, value } = this.props;
    return 100 * ((value - min) / (max - min));
  }

  move(position) {
    const newValue = this.positionToValue(position);
    if (newValue !== this.props.value) this.props.onChange(newValue);
  }

  positionToValue(position) {
    const { sliderStart: start, sliderLength: length } = this.state;
    const { max, min, step } = this.props;
    const pos = ((position.x - start) / length) * (max - min);
    return this.trimValue((Math.round(pos / step) * step) + min);
  }

  start(position) {
    this.handleResize(null, () => {
      this.setState({ pressed: true });
      this.props.onChange(this.positionToValue(position));
    });
  }

  stepDecimals() {
    return (this.props.step.toString().split('.')[1] || []).length;
  }

  trimValue(value) {
    if (value < this.props.min) return this.props.min;
    if (value > this.props.max) return this.props.max;
    return round(value, this.stepDecimals());
  }

  valueForInput(value) {
    const decimals = this.stepDecimals();
    return decimals > 0 ? value.toFixed(decimals) : value.toString();
  }

  renderSnaps() {
    if (!this.props.snaps) return undefined;
    return (
      <div className={this.props.theme.snaps}>
        {range(0, (this.props.max - this.props.min) / this.props.step).map(i =>
          <div key={`span-${i}`} className={this.props.theme.snap} />,
        )}
      </div>
    );
  }

  renderInput() {
    if (!this.props.editable) return undefined;
    return (
      <Input
        innerRef={(node) => {
          this.inputNode = node;
        }}
        className={this.props.theme.input}
        disabled={this.props.disabled}
        onFocus={this.handleInputFocus}
        onChange={this.handleInputChange}
        onBlur={this.handleInputBlur}
        value={this.state.inputFocused
          ? this.state.inputValue
          : this.valueForInput(this.props.value)}
      />
    );
  }

  render() {
    const { theme } = this.props;
    const knobStyles = { left: `${this.knobOffset()}%` };
    const className = classnames(theme.slider, {
      [theme.editable]: this.props.editable,
      [theme.disabled]: this.props.disabled,
      [theme.pinned]: this.props.pinned,
      [theme.pressed]: this.state.pressed,
      [theme.ring]: this.props.value === this.props.min,
    }, this.props.className);

    return (
      <div
        className={className}
        disabled={this.props.disabled}
        data-react-toolbox="slider"
        onBlur={this.handleSliderBlur}
        onFocus={this.handleSliderFocus}
        style={this.props.style}
        tabIndex={0}
      >
        <div
          ref={(node) => {
            this.sliderNode = node;
          }}
          className={theme.container}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
        >
          <div
            ref={(node) => {
              this.knobNode = node;
            }}
            className={theme.knob}
            onMouseDown={this.handleMouseDown}
            onTouchStart={this.handleTouchStart}
            style={knobStyles}
          >
            <div className={theme.innerknob} data-value={this.props.value} />
          </div>

          <div className={theme.progress}>
            <ProgressBar
              disabled={this.props.disabled}
              ref={(node) => {
                this.progressbarNode = node;
              }}
              className={theme.innerprogress}
              max={this.props.max}
              min={this.props.min}
              mode="determinate"
              value={this.props.value}
              buffer={this.props.buffer}
            />
            {this.renderSnaps()}
          </div>
        </div>

        {this.renderInput()}
      </div>
    );
  }
}
export default Slider;
