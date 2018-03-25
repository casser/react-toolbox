import * as React from "react";
import ReactToolbox from "../index";

export interface ChipTheme {
  /**
   * Added to the root element when the component includes an avatar.
   */
  avatar?: string;
  /**
   * Used for the root element.
   */
  chip?: string;
  /**
   * Added to the root element when the component is deletable.
   */
  deletable?: string;
  /**
   * Used for the delete element wrapper.
   */
  delete?: string;
  /**
   * Used for the delete icon.
   */
  deleteIcon?: string;
  /**
   * Used for the delete svg inner layer.
   */
  deleteX?: string;
}
export interface ChipProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the chip will be rendered with a delete icon.
   * @default false
   */
  deletable?: boolean;
  /**
   * Callback to be invoked when the delete icon is clicked.
   */
  onDeleteClick?: React.MouseEventHandler<HTMLSpanElement>;
  /**
   * Classnames object defining the component style.
   */
  theme?: ChipTheme;
}

import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { CHIP } from '../identifiers';
import { Avatar } from '../avatar/Avatar';
import theme from './theme.css';

@themr(CHIP, theme)
export class Chip extends React.Component<ChipProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   deletable: PropTypes.bool,
  //   onDeleteClick: PropTypes.func,
  //   theme: PropTypes.shape({
  //     avatar: PropTypes.string,
  //     chip: PropTypes.string,
  //     deletable: PropTypes.string,
  //     delete: PropTypes.string,
  //     deleteIcon: PropTypes.string,
  //     deleteX: PropTypes.string,
  //   }),
  // };
  static defaultProps = {
    className: '',
    deletable: false,
  };

  render() {
    const { children, className, deletable, onDeleteClick, theme, ...other } = this.props;
    let hasAvatar = false;
    if (React.Children.count(children)) {
      const flatChildren = React.Children.toArray(children);
      const firstChild:any = flatChildren[0];
      hasAvatar = firstChild && firstChild.type && firstChild.type === Avatar;
    }

    const classes = classnames(theme.chip, {
      [theme.deletable]: !!deletable,
      [theme.avatar]: !!hasAvatar,
    }, className);

    return (
      <div data-react-toolbox="chip" className={classes} {...other}>
        {typeof children === 'string' ? <span>{children}</span> : children}
        {
          deletable ? (
            <span className={theme.delete} onClick={onDeleteClick}>
              <svg viewBox="0 0 40 40" className={theme.deleteIcon}>
                <path className={theme.deleteX} d="M 12,12 L 28,28 M 28,12 L 12,28" />
              </svg>
            </span>
          ) : null
        }
      </div>
    );
  }
}
export default Chip;
