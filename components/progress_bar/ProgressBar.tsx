import * as React from "react";
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { PROGRESS_BAR } from '../identifiers';
import prefixer from '../utils/prefixer';
import theme from './theme.css';
import ReactToolbox from "components/index";
export interface ProgressBarTheme {
  /**
   * Used to style the buffer element in the linear progress.
   */
  buffer?: string;
  /**
   * Used for the circle element in the circular progress.
   */
  circle?: string;
  /**
   * Used for the root element when the type is circular.
   */
  circular?: string;
  /**
   * Added to the root element if mode is indeterminate.
   */
  indeterminate?: string;
  /**
   * Used for the root element when the type is linear.
   */
  linear?: string;
  /**
   * Added to the root if the component is multicolor (circular).
   */
  multicolor?: string;
  /**
   * Used for the inner path in the circular progress.
   */
  path?: string;
  /**
   * Used to style the value element in the linear progress.
   */
  value?: string;
}

export interface ProgressBarProps extends ReactToolbox.Props {
  /**
   * Value of a secondary progress bar useful for buffering.
   * @default 0
   */
  buffer?: number;
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
   * Mode of the progress bar, it can be determinate or indeterminate.
   * @default indeterminate
   */
  mode?: "determinate" | "indeterminate";
  /**
   * If true, the circular progress bar will be changing its color.
   * @default false
   */
  multicolor?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: ProgressBarTheme;
  /**
   * Type of the progress bar, it can be circular or linear.
   * @default linear
   */
  type?: "linear" | "circular";
  /**
   * Value of the current progress.
   * @default 0
   */
  value?: number;
}

@themr(PROGRESS_BAR, theme)
export class ProgressBar extends React.Component<ProgressBarProps> {
  // static propTypes = {
  //   buffer: PropTypes.number,
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   max: PropTypes.number,
  //   min: PropTypes.number,
  //   mode: PropTypes.oneOf(['determinate', 'indeterminate']),
  //   multicolor: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     buffer: PropTypes.string,
  //     circle: PropTypes.string,
  //     circular: PropTypes.string,
  //     indeterminate: PropTypes.string,
  //     linear: PropTypes.string,
  //     multicolor: PropTypes.string,
  //     path: PropTypes.string,
  //     value: PropTypes.string,
  //   }),
  //   type: PropTypes.oneOf(['linear', 'circular']),
  //   value: PropTypes.number,
  // };

  static defaultProps = {
    buffer: 0,
    className: '',
    max: 100,
    min: 0,
    mode: 'indeterminate',
    multicolor: false,
    type: 'linear',
    value: 0,
  };

  calculateRatio(value) {
    if (value < this.props.min) return 0;
    if (value > this.props.max) return 1;
    return (value - this.props.min) / (this.props.max - this.props.min);
  }

  circularStyle() {
    return this.props.mode !== 'indeterminate'
      ? { strokeDasharray: `${2 * Math.PI * 25 * this.calculateRatio(this.props.value)}, 400` }
      : undefined;
  }

  linearStyle() {
    if (this.props.mode !== 'indeterminate') {
      return {
        buffer: prefixer({ transform: `scaleX(${this.calculateRatio(this.props.buffer)})` }),
        value: prefixer({ transform: `scaleX(${this.calculateRatio(this.props.value)})` }),
      };
    }
    return {};
  }

  renderCircular() {
    return (
      <svg className={this.props.theme.circle} viewBox="0 0 60 60">
        <circle className={this.props.theme.path} style={this.circularStyle()} cx="30" cy="30" r="25" />
      </svg>
    );
  }

  renderLinear() {
    const { buffer, value } = this.linearStyle();
    return (
      <div>
        <span data-ref="buffer" className={this.props.theme.buffer} style={buffer} />
        <span data-ref="value" className={this.props.theme.value} style={value} />
      </div>
    );
  }

  render() {
    const { className, disabled, max, min, mode, multicolor, type, theme, value } = this.props;
    const _className = classnames(theme[type], {
      [theme.indeterminate]: mode === 'indeterminate',
      [theme.multicolor]: multicolor,
    }, className);

    return (
      <div
        disabled={disabled}
        data-react-toolbox="progress-bar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        className={_className}
      >
        {type === 'circular' ? this.renderCircular() : this.renderLinear()}
      </div>
    );
  }
}

export default ProgressBar;

