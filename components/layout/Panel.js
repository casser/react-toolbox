import React from 'react';
//import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr from '../utils/themr';
import { LAYOUT } from '../identifiers';
import theme from './theme.css';

@themr(LAYOUT, theme)
export class Panel extends React.Component {
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

export default Panel;

