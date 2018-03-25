import * as React from "react";

// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr  from '../utils/themr';
import { MENU } from '../identifiers';
import { IconButton } from '../button/IconButton';
import {Menu, MenuTheme} from './Menu';
import theme from './theme.css';
import ReactToolbox from "../types";
export interface IconMenuTheme extends MenuTheme {
  /**
   * Used for the icon element.
   */
  icon?: string;
  /**
   * Used for the root element of the icon menu.
   */
  iconMenu?: string;
}

export interface IconMenuProps extends ReactToolbox.Props {
  /**
   * If true, the inner Menu component will be active.
   * @default false
   */
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Icon font key string or Element to display the opener icon.
   * @default more_vert
   */
  icon?: React.ReactNode;
  /**
   * If true, the icon will show a ripple when is clicked.
   * @default true
   */
  iconRipple?: boolean;
  /**
   * If true, the neutral colors are inverted. Useful if the icon is over a dark background.
   * @default false
   */
  inverse?: boolean;
  /**
   * Transferred to the Menu component.
   * @default true
   */
  menuRipple?: boolean;
  /**
   * Callback that will be called when the menu is being hidden.
   */
  onHide?: Function;
  /**
   * Callback that will be invoked when a menu item is selected.
   */
  onSelect?: Function;
  /**
   * Callback that will be invoked when the menu is being shown.
   */
  onShow?: Function;
  /**
   * Determines the position of the menu. This property is transferred to the inner Menu component.
   * @default auto
   */
  position?: "auto" | "static" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  /**
   * If true, the menu will keep a value to highlight the active child item.
   * @default false
   */
  selectable?: boolean;
  /**
   * Used for selectable menus. Indicates the current selected value so the child item with this value can be highlighted.
   */
  selected?: any;
  /**
   * Classnames object defining the component style.
   */
  theme?: IconMenuTheme;
}

@themr(MENU, theme)
export class IconMenu extends React.Component<IconMenuProps> {
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
    event.stopImmediatePropagation();
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
      <div {...other} className={cn(theme.iconMenu, className)}>
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

