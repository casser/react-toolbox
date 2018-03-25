import * as React from "react";
import { DrawerProps,DrawerTheme } from '../drawer/Drawer';
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { Drawer } from '../drawer/Drawer';
import { LAYOUT } from '../identifiers';
import theme from './theme.css';

export interface SidebarTheme extends DrawerTheme {
  /**
   * Added to the root class when it is clipped.
   */
  clipped?: string;
  /**
   * Added to the root class if sidebar is pinned.
   */
  pinned?: string;
}

export interface SidebarProps extends DrawerProps {
  /**
   * If true, when the `AppBar` gets pinned, it will stand over the `Drawer`.
   * @default false
   */
  clipped?: boolean;
  /**
   * The breakpoint at which the drawer is automatically pinned.
   */
  permanentAt?: "sm" | "smTablet" | "md" | "lg" | "lgTablet" | "xl" | "xxl" | "xxxl";
  /**
   * If true, the sidebar will be pinned open.
   * @default false
   */
  pinned?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: SidebarTheme;
  /**
   * Width in standard increments (1-12) or percentage (25, 33, 50, 66, 75, 100)
   * @default 5
   */
  width?: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 25 | 33 | 50 | 66 | 75 | 100;
}


@themr(LAYOUT, theme)
export class Sidebar extends React.Component<SidebarProps> {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   clipped: PropTypes.bool,
  //   permanentAt: PropTypes.oneOf(['sm', 'smTablet', 'md', 'lg', 'lgTablet', 'xl', 'xxl', 'xxxl']),
  //   pinned: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     clipped: PropTypes.string,
  //     pinned: PropTypes.string,
  //   }),
  //   width: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 33, 50, 66, 75, 100]),
  // };
  static defaultProps = {
    className: '',
    pinned: false,
    right: false,
  };

  render() {
    const {
      active,
      className,
      clipped,
      permanentAt, // eslint-disable-line
      pinned,
      theme,
      ...rest
    } = this.props;
    const _className = classnames({
      [theme.pinned]: pinned,
      [theme.clipped]: clipped,
    }, className);

    return (
      <Drawer
        {...rest}
        active={active || pinned}
        className={_className}
        insideTree
        theme={theme}
        themeNamespace="sidebar"
        type="right"
        withOverlay={!pinned}
      />
    );
  }
}


export default Sidebar;
