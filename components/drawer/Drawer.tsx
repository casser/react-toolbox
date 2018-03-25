import * as React from "react";
import ReactToolbox from "../types";

import themr from '../utils/themr';
import classnames from '../utils/classnames';
import Portal from '../hoc/Portal';
import { DRAWER } from '../identifiers';
import { ActivableRenderer } from '../hoc/ActivableRenderer';
import { Overlay } from '../overlay/Overlay';
import theme from './theme.css';

export interface DrawerTheme {
  /**
   * Used for the root class when the drawer is active.
   */
  active?: string;
  /**
   * Used for the drawer content.
   */
  content?: string;
  /**
   * Root class.
   */
  drawer?: string;
  /**
   * Added to the root class when drawer is to the left.
   */
  left?: string;
  /**
   * Added to the root class when drawer is to the right.
   */
  right?: string;
  /**
   * A wrapper class for the top of the root.
   */
  wrapper?: string;
}

export interface DrawerCommonProps {
  /**
   * If true, the drawer will be visible.
   * @default false
   */
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true the Drawer is rendered inside the normal tree.
   * @default false
   */
  insideTree?: boolean;
  /**
   * Callback function to be invoked when the overlay is clicked.
   */
  onOverlayClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Type of drawer. It can be left or right to display the drawer on the left or right side of the screen.
   * @default left
   */
  type?: "left" | "right";
  /**
   * If true display an Overlay that locks the scroll when the Drawer is active.
   * @default true
   */
  withOverlay?: boolean;
  onEscKeyDown?
}

export interface DrawerProps extends ReactToolbox.Props, DrawerCommonProps {
  /**
   * Classnames object defining the component style.
   */
  theme?: DrawerTheme;
  themeNamespace?:string;
}


@themr(DRAWER, theme)
@ActivableRenderer()
export class Drawer extends React.Component<DrawerProps> {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   insideTree: PropTypes.bool,
  //   onEscKeyDown: PropTypes.func,
  //   onOverlayClick: PropTypes.func,
  //   theme: PropTypes.shape({
  //     active: PropTypes.string,
  //     drawer: PropTypes.string,
  //     left: PropTypes.string,
  //     right: PropTypes.string,
  //   }),
  //   type: PropTypes.oneOf([
  //     'left', 'right',
  //   ]),
  //   withOverlay: PropTypes.bool,
  // };
  static defaultProps = {
    active: false,
    className: '',
    insideTree: false,
    type: 'left',
    withOverlay: true,
  };

  render() {
    const {
      active,
      children,
      className,
      insideTree,
      onOverlayClick,
      onEscKeyDown,
      theme,
      type,
      withOverlay,
    } = this.props;
    const _className = classnames([theme.drawer, theme[type]], {
      [theme.active]: active,
    }, className);

    const content = (
      <aside data-react-toolbox="drawer" className={_className}>
        {children}
      </aside>
    );

    return React.createElement<any>(
      insideTree ? 'div' : Portal,
      { className: theme.wrapper },
      withOverlay && (
        <Overlay
          active={active}
          onClick={onOverlayClick}
          onEscKeyDown={onEscKeyDown}
          theme={theme}
          themeNamespace="overlay"
        />
      ),
      content,
    );
  }
}


export default Drawer;

