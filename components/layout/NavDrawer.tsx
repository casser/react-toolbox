import * as React from "react";
import { DrawerProps,DrawerTheme} from '../drawer/Drawer';
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { Drawer } from '../drawer/Drawer';
import { LAYOUT } from '../identifiers';
import theme from './theme.css';

export interface NavDrawerTheme extends DrawerTheme {
  /**
   * Added to the root class when it is pinned.
   */
  pinned?: string;
  /**
   * Added to the root class when it is clipped.
   */
  clipped?: string;
}
export interface NavDrawerProps extends DrawerProps {
  /**
   * If true, the drawer will be shown as an overlay.
   * @default false
   */
  active?: boolean;
  /**
   * If true, when the `AppBar` gets pinned, it will stand over the `Drawer`.
   * @default false
   */
  clipped?: boolean;
  /**
   * Callback function to be invoked when the overlay is clicked. It only works if the `Drawer` is actually displaying and Overlay
   */
  onOverlayClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * The breakpoint at which the drawer is automatically pinned.
   */
  permanentAt?: "sm" | "smTablet" | "md" | "lg" | "lgTablet" | "xl" | "xxl" | "xxxl";
  /**
   * If true, the drawer will be pinned open. pinned takes precedence over active.
   * @default false
   */
  pinned?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: NavDrawerTheme;
}


@themr(LAYOUT, theme)
export class NavDrawer extends React.Component<NavDrawerProps> {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   clipped: PropTypes.bool,
  //   permanentAt: PropTypes.oneOf(['sm', 'smTablet', 'md', 'lg', 'lgTablet', 'xl', 'xxl', 'xxxl']),
  //   pinned: PropTypes.bool,
  //   right: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     clipped: PropTypes.string,
  //     pinned: PropTypes.string,
  //   }),
  // };
  static defaultProps = {
    className: '',
    pinned: false,
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
        themeNamespace="navDrawer"
        withOverlay={!pinned}
      />
    );
  }
}


export default NavDrawer;

