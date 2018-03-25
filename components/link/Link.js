import React from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { LINK } from '../identifiers';
import { FontIcon } from '../font_icon/FontIcon';
import theme from './theme.css';

@themr(LINK, theme)
export class Link extends React.Component {
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
        {count && parseInt(count, 10) !== 0 ? <small>{count}</small> : null}
        {children}
      </a>
    );
  }
}

export default Link;

