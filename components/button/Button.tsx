import * as React from "react";
import ReactToolbox from "../index";

import classnames from '../utils/classnames';
import themr from '../utils/themr';
import {BUTTON} from '../identifiers';
import {FontIcon} from '../font_icon/FontIcon';
import {ripple} from '../ripple/Ripple';
import theme from './theme.css';

import { RippleProps } from '../ripple/index';
import { ButtonBaseProps, ButtonTheme } from './base';

export interface ButtonProps extends ButtonBaseProps, RippleProps {
  /**
   * If true, the button will have a flat look.
   * @default false
   */
  flat?: boolean;
  /**
   * If true, the button will have a floating look.
   * @default false
   */
  floating?: boolean;
  /**
   * Creates a link for the button.
   */
  href?: string;
  /**
   * The text string to use for the name of the button.
   */
  label?: string;
  /**
   * To be used with floating button. If true, the button will be smaller.
   * @default false
   */
  mini?: boolean;
  /**
   * If true, the button will have a raised look.
   * @default false
   */
  raised?: boolean;
  /**
   * Passed down to the root element
   */
  target?: string;
  /**
   * Classnames object defining the component style.
   */
  theme?: ButtonTheme;
}


@themr(BUTTON, theme)
@ripple({centered: false})
export class Button extends React.Component<ButtonProps> {

  // static propTypes = {
  //   accent: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   flat: PropTypes.bool,
  //   floating: PropTypes.bool,
  //   href: PropTypes.string,
  //   icon: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   inverse: PropTypes.bool,
  //   label: PropTypes.string,
  //   mini: PropTypes.bool,
  //   neutral: PropTypes.bool,
  //   onMouseLeave: PropTypes.func,
  //   onMouseUp: PropTypes.func,
  //   primary: PropTypes.bool,
  //   raised: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     accent: PropTypes.string,
  //     button: PropTypes.string,
  //     flat: PropTypes.string,
  //     floating: PropTypes.string,
  //     icon: PropTypes.string,
  //     inverse: PropTypes.string,
  //     mini: PropTypes.string,
  //     neutral: PropTypes.string,
  //     primary: PropTypes.string,
  //     raised: PropTypes.string,
  //     rippleWrapper: PropTypes.string,
  //     toggle: PropTypes.string,
  //   }),
  //   type: PropTypes.string,
  // };

  static defaultProps = {
    accent: false,
    className: '',
    flat: false,
    floating: false,
    mini: false,
    neutral: true,
    primary: false,
    raised: false,
    type: 'button',
  };

  private buttonNode:HTMLElement;

  getLevel = () => {
    if (this.props.primary) return 'primary';
    if (this.props.accent) return 'accent';
    return 'neutral';
  };

  getShape = () => {
    if (this.props.raised) return 'raised';
    if (this.props.floating) return 'floating';
    return 'flat';
  };

  handleMouseUp = (event) => {
    this.buttonNode.blur();
    if (this.props.onMouseUp) this.props.onMouseUp(event);
  };

  handleMouseLeave = (event) => {
    this.buttonNode.blur();
    if (this.props.onMouseLeave) this.props.onMouseLeave(event);
  };

  render() {
    const {
      accent,    // eslint-disable-line
      children,
      className,
      flat,      // eslint-disable-line
      floating,  // eslint-disable-line
      href,
      icon,
      inverse,
      label,
      mini,
      neutral,
      primary,   // eslint-disable-line
      raised,    // eslint-disable-line
      theme,
      type,
      ...others
    } = this.props;
    const element = href ? 'a' : 'button';
    const level = this.getLevel();
    const shape = this.getShape();
    const mouseEvents = {
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave,
    };

    const classes = classnames(theme.button, [theme[shape]], {
      [theme[level]]: neutral,
      [theme.mini]: mini,
      [theme.inverse]: inverse,
    }, className);

    const props = {
      ...others,
      ...mouseEvents,
      href,
      ref: (node) => {
        this.buttonNode = node;
      },
      className: classes,
      disabled: this.props.disabled,
      type: !href ? type : null,
      'data-react-toolbox': 'button',
    };

    const buttonElement = React.createElement(element, props,
      icon ? <FontIcon className={theme.icon} value={icon}/> : null,
      label,
      children,
    );

    return others.onMouseEnter && this.props.disabled
      ? <span {...mouseEvents}>{buttonElement}</span>
      : buttonElement;
  }
}

export default Button;
