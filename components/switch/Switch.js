import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { SWITCH } from '../identifiers';
import { Thumb } from './Thumb';
import theme from './theme.css';

@themr(SWITCH, theme)
// @ripple({centered: true, spread: 2.6})
export class Switch extends Component {
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

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false,
  };

  handleToggle = (event) => {
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
    const _className = classnames(theme[disabled ? 'disabled' : 'field'], className);
    return (
      <label data-react-toolbox="switch" className={_className}>
        <input
          {...others}
          checked={this.props.checked}
          className={theme.input}
          onClick={this.handleToggle}
          readOnly
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

