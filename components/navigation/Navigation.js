import React from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { NAVIGATION } from '../identifiers';
import { Button } from '../button/Button';
import { Link } from '../link/Link';
import theme from './theme.css';

@themr(NAVIGATION, theme)
export class Navigation extends React.Component {
  // static propTypes = {
  //   actions: PropTypes.array, // eslint-disable-line
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   routes: PropTypes.array, // eslint-disable-line
  //   theme: PropTypes.shape({
  //     button: PropTypes.string,
  //     horizontal: PropTypes.string,
  //     link: PropTypes.string,
  //     vertical: PropTypes.string,
  //   }),
  //   type: PropTypes.oneOf(['vertical', 'horizontal']),
  // };
  static defaultProps = {
    actions: [],
    className: '',
    type: 'horizontal',
    routes: [],
  };

  render() {
    const { actions, children, className, routes, theme, type } = this.props;
    const _className = classnames(theme[type], className);
    const buttons = actions.map((action, index) => (
      <Button className={theme.button} key={index} {...action} /> // eslint-disable-line
    ));

    const links = routes.map((route, index) => (
      <Link className={theme.link} key={index} {...route} /> // eslint-disable-line
    ));

    return (
      <nav data-react-toolbox="navigation" className={_className}>
        {links}
        {buttons}
        {children}
      </nav>
    );
  }
}

export default Navigation;

