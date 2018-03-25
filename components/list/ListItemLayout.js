import React from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import { FontIcon } from '../font_icon/FontIcon';
import { Avatar } from '../avatar/Avatar';
import { ListItemContent } from './ListItemContent';
import { ListItemActions } from './ListItemActions';
import theme from './theme.css';

@themr(LIST, theme)
export class ListItemLayout extends React.Component {

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
        {!emptyActions(leftActions) > 0 &&
        <ListItemActions type="left" theme={props.theme}>{leftActions}</ListItemActions>}
        {content}
        {!emptyActions(rightActions) > 0 &&
        <ListItemActions type="right" theme={props.theme}>{rightActions}</ListItemActions>}
      </span>
    );
  }
}
export default ListItemLayout;
