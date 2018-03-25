import * as React from 'react';
// import PropTypes from 'prop-types';
import themr from '../utils/themr';
import {LIST} from '../identifiers';
import {ListItemContent} from './ListItemContent';
import {ListItemLayout} from './ListItemLayout';
import {ripple} from '../ripple/Ripple';
import theme from './theme.css';
import ReactToolbox from "components/index";
import {ListItemActionsTheme} from "components/list/ListItemActions";
import {ListItemContentTheme} from "components/list/ListItemContent";
import {ListItemLayoutTheme} from "components/list/ListItemLayout";
import {ListItemTextTheme} from "components/list/ListItemText";
export interface ListItemTheme {
  /**
   * Used for the root element of the list.
   */
  listItem?: string;
}

export interface ListItemProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the item is displayed as disabled and is not clickable.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the item displays a ripple effect on click. By default it's inherited from the parent element.
   */
  ripple?: boolean;
  /**
   * Classnames object defining the component style.
   * @default false
   */
  theme?: ListItemTheme & ListItemActionsTheme & ListItemContentTheme & ListItemLayoutTheme & ListItemTextTheme;
  /**
   * In case you want to provide the item as a link, you can pass this property to specify the href.
   */
  to?: string;
}

@themr(LIST, theme)
@ripple({centered: false, listItemIgnore: true})
export class ListItem extends React.Component<ListItemProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   hasRipple: PropTypes.bool,
  //   onClick: PropTypes.func,
  //   onMouseDown: PropTypes.func,
  //   onTouchStart: PropTypes.func,
  //   ripple: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     listItem: PropTypes.string,
  //   }),
  //   to: PropTypes.string,
  // };

  static defaultProps = {
    className: '',
    disabled: false,
    ripple: false,
  };

  handleClick = (event) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event);
    }
  };

  groupChildren() {
    const children = {
      itemContent:undefined,
      leftActions: [],
      rightActions: [],
      ignored: [],
    };

    React.Children.forEach(this.props.children, (child:React.ReactElement<any>, i) => {
      if (!React.isValidElement(child)) {
        return undefined;
      }

      const {listItemIgnore, ...rest} = child.props as any;
      const strippedChild = {...child, ...{props: rest}};

      if (listItemIgnore) {
        children.ignored.push(strippedChild);
        return undefined;
      }
      if (child.type === ListItemContent) {
        children.itemContent = strippedChild;
        return undefined;
      }
      const bucket = children.itemContent ? 'rightActions' : 'leftActions';
      children[bucket].push({...strippedChild, key: i});
      return undefined;
    });

    return children;
  }

  render() {
    const {
      className,
      ripple: hasRipple,    // eslint-disable-line no-unused-vars
      onClick,      // eslint-disable-line no-unused-vars
      onMouseDown,  // eslint-disable-line no-unused-vars
      onTouchStart, // eslint-disable-line no-unused-vars
      theme,
      to,
      ...other
    } = this.props;
    const children = this.groupChildren();
    const content = <ListItemLayout theme={theme} {...children} {...other} />;
    return (
      <li
        className={`${theme.listItem} ${className}`}
        onClick={this.handleClick}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {to ? <a href={this.props.to}>{content}</a> : content}
        {children.ignored}
      </li>
    );
  }
}

export default ListItem;

