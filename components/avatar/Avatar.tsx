import * as React from "react";
import ReactToolbox from "../index";

//import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { AVATAR } from '../identifiers';
import { FontIcon } from '../font_icon/FontIcon';
import theme from './theme.css';

export interface AvatarTheme {
  /**
   * Used for the root class of the element.
   */
  avatar?: string;
  /**
   * Added to the root element when the component has image.
   */
  image?: string;
  /**
   * Used for the root element if the component shows the letter.
   */
  letter?: string;
}

export interface AvatarProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Set to true if your image is not squared so it will be used as a cover for the element.
   * @default false
   */
  cover?: boolean;
  /**
   * A key to identify an Icon from Material Design Icons or a custom Icon Element.
   */
  icon?: React.ReactNode;
  /**
   * An image source or an image element.
   */
  image?: React.ReactNode;
  /**
   * Classnames object defining the component style.
   */
  theme?: AvatarTheme;
  /**
   * A title for the image. If no image is provided, the first letter will be displayed as the avatar.
   */
  title?: string;
  /**
   * Additional properties for component root element.
   */
  [key: string]: any;
}

@themr(AVATAR, theme)
export class Avatar extends React.Component<AvatarProps> {
  /*static propTypes = {
    alt: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    cover: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    theme: PropTypes.shape({
      avatar: PropTypes.string,
      image: PropTypes.string,
      letter: PropTypes.string,
    }),
    title: PropTypes.string,
  };*/
  static defaultProps = {
    alt: '',
    cover: false,
  };
  render() {
    const { alt, children, className, cover, icon, image, theme, title, ...other } = this.props;
    return (
      <div data-react-toolbox="avatar" className={classnames(theme.avatar, className)} {...other}>
        {children}
        {cover && typeof image === 'string' &&
        <span aria-label={alt} className={theme.image} style={{ backgroundImage: `url(${image})` }} />}
        {!cover && (typeof image === 'string' ?
          <img alt={alt} className={theme.image} src={image} title={title} /> : image)}
        {typeof icon === 'string' ? <FontIcon className={theme.letter} value={icon} alt={alt} /> : icon}
        {title ? <span className={theme.letter}>{title[0]}</span> : null}
      </div>
    );
  }
}

