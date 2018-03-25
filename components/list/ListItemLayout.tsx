import * as React from 'react';

// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import { FontIcon } from '../font_icon/FontIcon';
import { Avatar } from '../avatar/Avatar';
import { ListItemContent } from './ListItemContent';
import { ListItemActions } from './ListItemActions';
import theme from './theme.css';
import ReactToolbox from "components/index";
import {ListItemContentTheme} from "components/list/ListItemContent";
import {ListItemActionsTheme} from "components/list/ListItemActions";

export interface ListItemLayoutTheme {
  /**
   * Added to the inner content if its a disabled item.
   */
  disabled?: string;
  /**
   * Used for the inner content of a list item.
   */
  item?: string;
  /**
   * Added when layout is selectable.
   */
  selectable?: string;
}

export interface ListItemLayoutProps extends ReactToolbox.Props {
  /**
   * A string URL to specify an avatar in the left side of the item.
   */
  avatar?: string | React.ReactElement<any>;
  /**
   * Main text of the item.
   */
  caption?: string;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the item is displayed as disabled and it's not clickable.
   * @default false
   */
  disabled?: boolean;
  /**
   * Layout content.
   */
  itemContent?: React.ReactChild;
  /**
   * A list of elements that are placed on the left side of the item and after the avatar attribute.
   */
  leftActions?: React.ReactNode[];
  /**
   * A string key of a font icon or element to display an icon in the left side of the item.
   */
  leftIcon?: string | React.ReactElement<any>;
  /**
   * Secondary text to display under the caption.
   */
  legend?: string;
  /**
   * A list of elements that are placed on the right side of the item and after the rightIcon attribute.
   */
  rightActions?: React.ReactNode[];
  /**
   * The same as the leftIcon but in this case the icon is displayed in the right side.
   */
  rightIcon?: string | React.ReactElement<any>;
  /**
   * If true, the elements in the list will display a hover effect and a pointer cursor. Inherited from the parent.
   * @default false
   */
  selectable?: boolean;
  /**
   * Object defining the component class name mappings.
   */
  theme?: ListItemLayoutTheme & ListItemContentTheme & ListItemActionsTheme;
  /**
   * In case you want to provide the item as a link, you can pass this property to specify the href.
   */
  to?: string;
}


@themr(LIST, theme)
export class ListItemLayout extends React.Component<ListItemLayoutProps> {

  // static propTypes = {
  //   avatar: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   caption: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.node,
  //   ]),
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   itemContent: PropTypes.element,
  //   leftActions: PropTypes.arrayOf(PropTypes.node),
  //   leftIcon: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   legend: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.node,
  //   ]),
  //   rightActions: PropTypes.arrayOf(PropTypes.node),
  //   rightIcon: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   selectable: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     disabled: PropTypes.string,
  //     item: PropTypes.string,
  //     selectable: PropTypes.string,
  //   }),
  // };
  static defaultProps = {
    disabled: false,
    selectable: false,
  };

  render() {
    const props = this.props;
    const className = classnames(props.theme.item, {
      [props.theme.disabled]: props.disabled,
      [props.theme.selectable]: props.selectable,
    }, props.className);

    const leftActions = [
      props.leftIcon && <FontIcon value={props.leftIcon} key="leftIcon" />,
      props.avatar && <Avatar image={props.avatar} key="avatar" />,
      ...props.leftActions,
    ];
    const rightActions = [
      props.rightIcon && <FontIcon value={props.rightIcon} key="rightIcon" />,
      ...props.rightActions,
    ];
    const emptyActions = item => !item[0] && !item[1] && !item[2];
    const content = props.itemContent || (
      <ListItemContent theme={props.theme} caption={props.caption} legend={props.legend} />
    );

    return (
      <span className={className}>
        {!emptyActions(leftActions) &&
        <ListItemActions type="left" theme={props.theme}>{leftActions}</ListItemActions>}
        {content}
        {!emptyActions(rightActions) &&
        <ListItemActions type="right" theme={props.theme}>{rightActions}</ListItemActions>}
      </span>
    );
  }
}
export default ListItemLayout;
