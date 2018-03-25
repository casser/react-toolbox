import * as React from "react";
import ReactToolbox from "../types";
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { CARD } from '../identifiers';
import { Avatar } from '../avatar/Avatar';
import theme from './theme.css';

export interface CardTitleTheme {
  /**
   * Class used for the root element.
   */
  cardTitle?: string;
  /**
   * Added to the root element when the card has no avatar.
   */
  large?: string;
  /**
   * Added to the title element.
   */
  title?: string;
  /**
   * Added to the root element when the card has avatar.
   */
  small?: string;
  /**
   * Added to the subtitle element.
   */
  subtitle?: string;
}
export interface CardTitleProps extends ReactToolbox.Props {
  /**
   * A string URL or Element to specify an avatar in the left side of the title.
   */
  avatar?: React.ReactNode;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Text used for the sub header of the card.
   */
  subtitle?: React.ReactNode;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTitleTheme;
  /**
   * Text used for the title of the card.
   */
  title?: React.ReactNode;
}

@themr(CARD, theme)
export class CardTitle extends React.Component<CardTitleProps> {
  // static propTypes = {
  //   avatar: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   children: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //     PropTypes.array,
  //   ]),
  //   className: PropTypes.string,
  //   subtitle: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   theme: PropTypes.shape({
  //     large: PropTypes.string,
  //     title: PropTypes.string,
  //     small: PropTypes.string,
  //     subtitle: PropTypes.string,
  //   }),
  //   title: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  // };
  render() {
    const { avatar, children, className, subtitle, theme, title, ...other } = this.props;
    const classes = classnames(theme.cardTitle, {
      [theme.small]: avatar,
      [theme.large]: !avatar,
    }, className);

    return (
      <div className={classes} {...other}>
        {/*todo: fix any type for theme*/}
        {typeof avatar === 'string' ? <Avatar image={avatar} theme={theme as any} /> : avatar}
        <div>
          {title && <h5 className={theme.title}>{title}</h5>}
          {children && typeof children === 'string' && (
            <h5 className={theme.title}>{children}</h5>
          )}
          {subtitle && <p className={theme.subtitle}>{subtitle}</p>}
          {children && typeof children !== 'string' && children}
        </div>
      </div>
    );
  }
}

