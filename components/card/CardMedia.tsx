import * as React from "react";
import ReactToolbox from "../types";
import themr from '../utils/themr';
import classnames from '../utils/classnames';
import { CARD } from '../identifiers';
import theme from './theme.css';

export interface CardMediaTheme {
  /**
   * Added to the element root.
   */
  cardMedia?: string;
  /**
   * Used for the content element.
   */
  content?: string;
  /**
   * Added to content element if its overlayed.
   */
  contentOverlay?: string;
  /**
   * Added to content element if its squared.
   */
  square?: string;
  /**
   * Added to content element if its wide.
   */
  wide?: string;
}
export interface CardMediaProps extends ReactToolbox.Props {
  /**
   * Forces a 16:9 or 1:1 aspect ratio respectively. Unset, the media area will have a flexible height.
   */
  aspectRatio?: "wide" | "square";
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Sets the background color.
   */
  color?: string;
  /**
   * Creates a dark overlay underneath the child components.
   */
  contentOverlay?: boolean;
  /**
   * Can be used instead of children. Accepts an element or a URL string.
   */
  image?: React.ReactNode;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardMediaTheme;
  /**
   * Additional properties passed to component root.
   */
  [key: string]: any;
}

@themr(CARD, theme)
export class CardMedia extends React.Component<CardMediaProps> {
  // static propTypes = {
  //   aspectRatio: PropTypes.oneOf(['wide', 'square']),
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   color: PropTypes.string,
  //   contentOverlay: PropTypes.bool,
  //   image: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   theme: PropTypes.shape({
  //     cardMedia: PropTypes.string,
  //     content: PropTypes.string,
  //     contentOverlay: PropTypes.string,
  //     square: PropTypes.string,
  //     wide: PropTypes.string,
  //   }),
  // };
  render() {
    const {
      aspectRatio,
      children,
      className,
      color,
      contentOverlay,
      image,
      theme,
      ...other
    } = this.props;
    const classes = classnames(theme.cardMedia, {
      [theme[aspectRatio]]: aspectRatio,
    }, className);

    const innerClasses = classnames(theme.content, {
      [theme.contentOverlay]: contentOverlay,
    });

    const bgStyle = {
      backgroundColor: color || undefined,
      backgroundImage: typeof image === 'string' ? `url('${image}')` : undefined,
    };

    return (
      <div style={bgStyle} className={classes} {...other}>
        <div className={innerClasses}>
          {children}
        </div>
      </div>
    );
  }
}


export default CardMedia;

