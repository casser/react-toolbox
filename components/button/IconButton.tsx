import * as React from "react";
import { ButtonBaseProps } from './base';
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { BUTTON } from '../identifiers';
import { FontIcon } from '../font_icon/FontIcon';
import { ripple } from '../ripple/Ripple';
import theme from './theme.css';

export interface IconButtonTheme {
  /**
   * Used for the root in case button is accent.
   */
  accent?: string;
  /**
   * Used for the root element in any button.
   */
  button?: string;
  /**
   * For the icon inside a button.
   */
  icon?: string;
  /**
   * Used when colors are inverted.
   */
  inverse?: string;
  /**
   * Used for neutral colored buttons.
   */
  neutral?: string;
  /**
   * Used for primary buttons when button is primary.
   */
  primary?: string;
  /**
   * Used for the ripple element.
   */
  rippleWrapper?: string;
  /**
   * Used for toggle buttons in the root element.
   */
  toggle?: string;
}
export interface IconButtonProps extends ButtonBaseProps {
  /**
   * Creates a link for the button.
   */
  href?: string;
  /**
   * Classnames object defining the component style.
   */
  theme?: IconButtonTheme;
}

@themr(BUTTON, theme)
@ripple({ centered: true })
export class IconButton extends React.Component<IconButtonProps> {
  // static propTypes = {
  //   accent: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   href: PropTypes.string,
  //   icon: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   inverse: PropTypes.bool,
  //   neutral: PropTypes.bool,
  //   onMouseLeave: PropTypes.func,
  //   onMouseUp: PropTypes.func,
  //   primary: PropTypes.bool,
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
    neutral: true,
    primary: false,
    type: 'button',
  };

  private buttonNode:HTMLElement;

  getLevel = () => {
    if (this.props.primary) {
      return 'primary';
    }
    if (this.props.accent) {
      return 'accent';
    }
    return 'neutral';
  };

  handleMouseUp = (event) => {
    this.buttonNode.blur();
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  };

  handleMouseLeave = (event) => {
    this.buttonNode.blur();
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  render() {
    const {
      accent,    // eslint-disable-line
      children,
      className,
      href,
      icon,
      inverse,
      neutral,
      primary,   // eslint-disable-line
      theme,
      type,
      ...others
    } = this.props;
    const element = href ? 'a' : 'button';
    const level = this.getLevel();
    const classes = classnames([ theme.toggle ], {
      [ theme[ level ] ]: neutral,
      [ theme.inverse ]: inverse,
    }, className);

    const props = {
      ...others,
      href,
      ref: (node) => {
        this.buttonNode = node;
      },
      className: classes,
      disabled: this.props.disabled,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave,
      type: !href ? type : null,
      'data-react-toolbox': 'button',
    };

    const iconElement = typeof icon === 'string'
      ? <FontIcon className={theme.icon} value={icon}/>
      : icon;

    return React.createElement(element, props,
      icon && iconElement,
      children,
    );
  }
}

export default IconButton;
