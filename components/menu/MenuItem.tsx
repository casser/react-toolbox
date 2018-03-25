import * as React from "react";

// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr from '../utils/themr';
import { MENU } from '../identifiers';
import { FontIcon } from '../font_icon/FontIcon';
import {ripple} from '../ripple/Ripple';
import theme from './theme.css';
import ReactToolbox from "components/index";

export interface MenuItemTheme {
  /**
   * Used for the caption inside the item.
   */
  caption?: string;
  /**
   * Added to the root element if it's disabled.
   */
  disabled?: string;
  /**
   * Used for the icon element if exists.
   */
  icon?: string;
  /**
   * Used as the root class for the component.
   */
  menuItem?: string;
  /**
   * Added to the root element in case it's selected.
   */
  selected?: string;
  /**
   * Used for the shortcut element if exists.
   */
  shortcut?: string;
}

export interface MenuItemProps extends ReactToolbox.Props {
  /**
   * The text to include in the menu item. Required.
   */
  caption: string;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the item will be displayed as disabled and is not selectable.
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon font key string or Element to display in the right side of the option.
   */
  icon?: React.ReactNode;
  /**
   * Transferred from the Menu component for selectable menus. Indicates if it's the current active option.
   * @default false
   */
  selected?: boolean;
  /**
   * Displays shortcut text on the right side of the caption attribute.
   */
  shortcut?: string;
  /**
   * Classnames object defining the component style.
   */
  theme?: MenuItemTheme;
  /**
   * Passed down to the root element
   */
  value?: any;
}


@themr(MENU, theme)
@ripple({})
export class MenuItem extends React.Component<MenuItemProps> {
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
      //this.props.onClick(event, this);
      this.props.onClick(event);
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
    const className = cn(theme.menuItem, {
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

