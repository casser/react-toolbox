import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { MENU } from '../identifiers';
import { FontIcon } from '../font_icon/FontIcon';
import {ripple} from '../ripple/Ripple';
import theme from './theme.css';

@themr(MENU, theme)
@ripple({})
export class MenuItem extends Component {
  // static propTypes = {
  //   caption: PropTypes.string,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   icon: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   onClick: PropTypes.func,
  //   selected: PropTypes.bool,
  //   shortcut: PropTypes.string,
  //   theme: PropTypes.shape({
  //     caption: PropTypes.string,
  //     disabled: PropTypes.string,
  //     icon: PropTypes.string,
  //     menuItem: PropTypes.string,
  //     selected: PropTypes.string,
  //     shortcut: PropTypes.string,
  //   }),
  // };

  static defaultProps = {
    className: '',
    disabled: false,
    selected: false,
  };

  handleClick = (event) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event, this);
    }
  };

  render() {
    const {
      caption,
      children,
      disabled,
      icon,
      selected,
      shortcut,
      theme,
      ...others
    } = this.props;
    const className = classnames(theme.menuItem, {
      [theme.selected]: selected,
      [theme.disabled]: disabled,
    }, this.props.className);

    return (
      <li {...others} data-react-toolbox="menu-item" className={className} onClick={this.handleClick}>
        {icon ? <FontIcon value={icon} className={theme.icon} /> : null}
        <span className={theme.caption}>{caption}</span>
        {shortcut ? <small className={theme.shortcut}>{shortcut}</small> : null}
        {children}
      </li>
    );
  }
}
export default MenuItem;

