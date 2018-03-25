import React from 'react';
//import PropTypes from 'prop-types';
import classnames from '../utils/classnames';

export class FontIcon extends React.Component {
  // static propTypes = {
  //   alt: PropTypes.string,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   theme: PropTypes.object, // eslint-disable-line
  //   value: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  // };
  static defaultProps = {
    alt: '',
    className: '',
  };
  render() {
    const { alt, children, className, theme, value, ...other } = this.props;
    return ( // eslint-disable-line
      <span
        data-react-toolbox="font-icon"
        aria-label={alt}
        className={classnames({ 'material-icons': typeof value === 'string' || typeof children === 'string' }, className)}
        {...other}
      >
        {value}
        {children}
      </span>
    );
  }
}

export default FontIcon;

