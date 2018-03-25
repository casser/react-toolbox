import * as React from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import { ripple } from '../ripple/Ripple';
import themr from '../utils/themr';
import theme from './theme.css';
import { CHECKBOX } from '../identifiers';

export interface CheckTheme {
  check?:string,
  checked?:string,
}
export interface CheckProps {
  checked?: boolean,
  children?: React.ReactNode,
  onMouseDown?: React.MouseEventHandler<Element>,
  theme?:CheckTheme,
  style?:React.CSSProperties
  disabled?:boolean;
  rippleClassName?:string
}

@themr(CHECKBOX, theme)
@ripple({ centered: true, spread: 2.6 })
export class Check extends React.Component<CheckProps> {
  // static propTypes = {
  //   checked: PropTypes.bool,
  //   children: PropTypes.node,
  //   onMouseDown: PropTypes.func,
  //   style:  PropTypes.object,
  //   theme: PropTypes.shape({
  //     check: PropTypes.string,
  //     checked: PropTypes.string,
  //   }),
  // };

  render() {
    const { checked, children, onMouseDown, theme, style } = this.props;
    return (
      <div
        data-react-toolbox="check"
        className={classnames(theme.check, { [ theme.checked ]: checked })}
        onMouseDown={onMouseDown}
        style={style}
      >
        {children}
      </div>
    );
  }
}

