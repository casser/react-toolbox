import * as React from "react";
import ReactToolbox from "../types";
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { getViewport } from '../utils/utils';
import filterReactChildren from '../utils/filter-react-children';
import isComponentOfType from '../utils/is-component-of-type';
import { AppBar } from '../app_bar/AppBar';
import { NavDrawer } from './NavDrawer';
import { Sidebar } from './Sidebar';
import isBrowser from '../utils/is-browser';
import breakpoints from '../utils/breakpoints';
import { LAYOUT } from '../identifiers';
import theme from './theme.css';

export interface LayoutTheme {
  appbarFixed?: string;
  /**
   * The root class that wraps the whole layout.
   */
  layout?: string;
  /**
   * Added to the root if there is a pinned `NavDrawer`
   */
  navDrawerPinned?: string;
  /**
   * Added to the root if there is a clipped NavDrawer.
   */
  navDrawerClipped?: string;
  /**
   * Added to the root if there is a pinned sidebar.
   */
  sidebarPinned?: string;
  /**
   * Added to the root if there is a clipped sidebar.
   */
  sidebarClipped?: string;

  /**
   * Added to the root element in case there is a sidebar present. width correspond to the value passed to the `Sidebar`.
   */
  sidebarWidth1?: string;
  sidebarWidth2?: string;
  sidebarWidth3?: string;
  sidebarWidth4?: string;
  sidebarWidth5?: string;
  sidebarWidth6?: string;
  sidebarWidth7?: string;
  sidebarWidth8?: string;
  sidebarWidth9?: string;
  sidebarWidth10?: string;
  sidebarWidth11?: string;
  sidebarWidth12?: string;
  sidebarWidth25?: string;
  sidebarWidth33?: string;
  sidebarWidth50?: string;
  sidebarWidth66?: string;
  sidebarWidth75?: string;
  sidebarWidth100?: string;
}
export interface LayoutProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: JSX.Element | JSX.Element[];
  /**
   * Classnames object defining the component style.
   */
  theme?: LayoutTheme;
}

const isNavDrawer = child => isComponentOfType(NavDrawer, child);
const isSidebar = child => isComponentOfType(Sidebar, child);
const isAppBar = child => isComponentOfType(AppBar, child);
const isUnknown = child => !isNavDrawer(child) && !isSidebar(child) && !isAppBar(child);

@themr(LAYOUT, theme)
export class Layout extends React.Component<LayoutProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   theme: PropTypes.shape({
  //     appbarFixed: PropTypes.string,
  //     layout: PropTypes.string,
  //     navDrawerClipped: PropTypes.string,
  //     navDrawerPinned: PropTypes.string,
  //     sidebarClipped: PropTypes.string,
  //     sidebarPinned: PropTypes.string,
  //   }),
  // };

  static defaultProps = {
    className: '',
  };

  state = {
    width: isBrowser() && getViewport().width,
  };

  componentDidMount() {
    if (!this.state.width) this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ width: getViewport().width });
  };

  isPinned = (sideNav) => {
    if (sideNav) {
      const { permanentAt, pinned } = sideNav.props;
      const { width } = this.state;
      return width > breakpoints[permanentAt] || pinned;
    }
    return undefined;
  };

  render() {
    const { children, className, theme, ...rest } = this.props;
    const appBar = filterReactChildren(children, isAppBar)[0];
    const navDrawer = filterReactChildren(children, isNavDrawer)[0];
    const sidebar = filterReactChildren(children, isSidebar)[0];
    const unknown = filterReactChildren(children, isUnknown);
    const appBarFixed = appBar && appBar.props.fixed;
    const navDrawerPinned = this.isPinned(navDrawer);
    const navDrawerClipped = navDrawer && navDrawer.props.clipped;
    const sidebarWidth = sidebar && sidebar.props.width;
    const sidebarPinned = this.isPinned(sidebar);
    const sidebarClipped = sidebar && sidebar.props.clipped;

    const clonedAppBar = appBar && React.cloneElement(appBar, {
      theme,
      themeNamespace: 'appbar',
    });

    const clonedLeftSideNav = navDrawer && React.cloneElement(navDrawer, {
      clipped: navDrawerClipped,
      pinned: navDrawerPinned,
    });

    const clonedRightSideNav = sidebar && React.cloneElement(sidebar, {
      clipped: sidebarClipped,
      pinned: sidebarPinned,
    });

    const _className = classnames(theme.layout,
      theme[`sidebarWidth${sidebarWidth}`], {
        [theme.navDrawerPinned]: navDrawerPinned,
        [theme.navDrawerClipped]: navDrawerClipped,
        [theme.sidebarPinned]: sidebarPinned,
        [theme.sidebarClipped]: sidebarClipped,
        [theme.appbarFixed]: appBarFixed,
      }, className);

    return (
      <div {...rest} className={_className}>
        {clonedLeftSideNav}
        {clonedAppBar}
        {unknown}
        {clonedRightSideNav}
      </div>
    );
  }
}

