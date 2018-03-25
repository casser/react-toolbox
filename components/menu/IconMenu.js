import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { MENU } from '../identifiers';
import { IconButton } from '../button/IconButton';
import { Menu } from './Menu';
import theme from './theme.css';

@themr(MENU, theme)
export class IconMenu extends Component {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   icon: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   iconRipple: PropTypes.bool,
  //   inverse: PropTypes.bool,
  //   menuRipple: PropTypes.bool,
  //   onClick: PropTypes.func,
  //   onHide: PropTypes.func,
  //   onSelect: PropTypes.func,
  //   onShow: PropTypes.func,
  //   position: PropTypes.string,
  //   selectable: PropTypes.bool,
  //   selected: PropTypes.node,
  //   theme: PropTypes.shape({
  //     icon: PropTypes.string,
  //     iconMenu: PropTypes.string,
  //   }),
  // };

  static defaultProps = {
    active: false,
    className: '',
    icon: 'more_vert',
    iconRipple: true,
    menuRipple: true,
    position: 'auto',
    selectable: false,
  };

  state = {
    active: this.props.active,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.active !== nextProps.active) {
      this.setState({ active: nextProps.active });
    }
  }

  handleButtonClick = (event) => {
    this.setState({ active: !this.state.active });
    if (this.props.onClick) this.props.onClick(event);
  };

  handleMenuHide = () => {
    this.setState({ active: false });
    if (this.props.onHide) this.props.onHide();
  };

  render() {
    const {
      active, children, className, icon, iconRipple, inverse, menuRipple, onHide, // eslint-disable-line
      onSelect, onShow, position, selectable, selected, theme, ...other
    } = this.props;
    return (
      <div {...other} className={classnames(theme.iconMenu, className)}>
        <IconButton
          className={theme.icon}
          icon={icon}
          inverse={inverse}
          onClick={this.handleButtonClick}
          ripple={iconRipple}
        />
        <Menu
          active={this.state.active}
          onHide={this.handleMenuHide}
          onSelect={onSelect}
          onShow={onShow}
          position={position}
          ripple={menuRipple}
          selectable={selectable}
          selected={selected}
          theme={theme}
        >
          {children}
        </Menu>
      </div>
    );
  }
}

export default IconMenu;

