import * as React from 'react';
//import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr  from '../utils/themr';
import { TABS } from '../identifiers';
import theme from './theme.css';
import ReactToolbox from "components/index";

export interface TabContentTheme {
  /**
   * Added when tab is active.
   */
  active?: string;
  /**
   * Used for the tab content element.
   */
  tab?: string;
}

export interface TabContentProps extends ReactToolbox.Props {
  /**
   * Whether tab is active.
   */
  active?: boolean;
  /**
   * Tab content.
   */
  children?: React.ReactNode;
  /**
   * Current tab index.
   */
  tabIndex?: number;
  /**
   * Classnames object defining the component style.
   */
  theme?: TabContentTheme;

  //TODO : check why was not defined in oiginal
  hidden?:boolean;
}

@themr(TABS, theme)
export class TabContent extends React.Component<TabContentProps> {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   hidden: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     active: PropTypes.string,
  //     tab: PropTypes.string,
  //   }),
  // };
  static defaultProps = {
    active: false,
    className: '',
    hidden: true,
  };

  render() {
    const className = cn(this.props.theme.tab, {
      [this.props.theme.active]: this.props.active,
    }, this.props.className);

    return (
      <section className={className} role="tabpanel" aria-expanded={this.props.hidden} >
        {this.props.children}
      </section>
    );
  }
}

export default TabContent;

