import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { TABS } from '../identifiers';
import theme from './theme.css';

@themr(TABS, theme)
export class TabContent extends Component {
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
    const className = classnames(this.props.theme.tab, {
      [this.props.theme.active]: this.props.active,
    }, this.props.className);

    return (
      <section className={className} role="tabpanel" aria-expanded={this.props.hidden}>
        {this.props.children}
      </section>
    );
  }
}

export default TabContent;

