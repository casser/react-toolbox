import * as React from "react";
import ReactToolbox from "../types";
import cn from '../utils/classnames';
import themr from '../utils/themr';
import { LAYOUT } from '../identifiers';
import theme from './theme.css';

export interface PanelTheme {
  /**
   * Used in the root class in case the panel has bodyScroll.
   */
  bodyScroll?: string;
  /**
   * Used as the root class of the panel component.
   */
  panel?: string;
}

export interface PanelProps extends ReactToolbox.Props {
  /**
   * You can set it to true in case you are using a pinned Sidebar so it takes an scrolled `div` instead of using the document scroll.
   */
  bodyScroll?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: PanelTheme;
}

@themr(LAYOUT, theme)
export class Panel extends React.Component<PanelProps> {
  // static propTypes = {
  //   bodyScroll: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   theme: PropTypes.shape({
  //     panel: PropTypes.string,
  //   }),
  // };
  static defaultProps = {
    bodyScroll: true,
    className: '',
  };
  render() {
    const { bodyScroll, children, className, theme, ...other } = this.props;
    const _className = cn(theme.panel, { [theme.bodyScroll]: bodyScroll }, className);
    return (
      <div {...other} data-react-toolbox="panel" className={_className}>
        {children}
      </div>
    );
  }
}


