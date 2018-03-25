import * as React from "react";
import ReactToolbox from "../types";

export interface LinkTheme {
  /**
   * Added to the root element if the Link is active.
   */
  active?: string;
  /**
   * Used for the icon element if it's present.
   */
  icon?: string;
  /**
   * Used for the root element.
   */
  link?: string;
}
export interface LinkProps extends ReactToolbox.Props {
  /**
   * If true, adds active style to link.
   * @default false
   */
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Sets a count number.
   */
  count?: number;
  /**
   * Sets the anchor link.
   */
  href?: string;
  /**
   * An icon key string to include a FontIcon component in front of the text.
   */
  icon?: React.ReactNode;
  /**
   * The text string used for the text content of the link.
   */
  label?: string;
  /**
   * Classnames object defining the component style.
   */
  theme?: LinkTheme;
  /**
   * Additional parameters passed to anchor element.
   */
  [key: string]: any;
}

import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { LINK } from '../identifiers';
import { FontIcon } from '../font_icon/FontIcon';
import theme from './theme.css';

@themr(LINK, theme)
export class Link extends React.Component<LinkProps> {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   count: PropTypes.number,
  //   icon: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   label: PropTypes.string,
  //   theme: PropTypes.shape({
  //     active: PropTypes.string,
  //     icon: PropTypes.string,
  //     link: PropTypes.string,
  //   }),
  // };
  static defaultProps = {
    active: false,
    className: '',
  };
  render() {
    const { active, children, className, count, icon, label, theme, ...others } = this.props;
    const _className = classnames(theme.link, {
      [theme.active]: active,
    }, className);

    return (
      <a data-react-toolbox="link" className={_className} {...others}>
        {icon ? <FontIcon className={theme.icon} value={icon} /> : null}
        {label ? <abbr>{label}</abbr> : null}
        {count && count !== 0 ? <small>{count}</small> : null}
        {children}
      </a>
    );
  }
}

export default Link;

