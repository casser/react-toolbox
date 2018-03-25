import * as React from 'react';
//import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr from '../utils/themr';
import {APP_BAR} from '../identifiers';
import {IconButton} from '../button/IconButton';
import theme from './theme.css';
import ReactToolbox from "../types";

export interface AppBarTheme {
  /**
   * Used for the component root element.
   */
  appBar?: string;
  /**
   * Added to the root element when the app bar is fixed.
   */
  fixed?: string;
  /**
   * Added to the root element when the app bar is flat.
   */
  flat?: string;
  /**
   * Used as the app bar title.
   */
  title?: string;
  /**
   * Added to the left icon app bar element.
   */
  leftIcon?: string;
  /**
   * Added to the right icon app bar element.
   */
  rightIcon?: string;
  /**
   * Added to the root element when the app bar is hidden during scroll.
   */
  scrollHide?: string;
  // internal
  inner?:string
}
export interface AppBarProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Determine if the bar should have position fixed or relative.
   * @default false
   */
  fixed?: boolean;
  /**
   * If true, the AppBar doesn't show a shadow.
   * @default false
   */
  flat?: boolean;
  /**
   * If it exists it is used as the AppBar title
   */
  title?: string;
  /**
   * If it exists it is used as the AppBar left icon
   */
  leftIcon?: React.ReactNode;
  /**
   * Called when the left icon is clicked
   */
  onLeftIconClick?: React.MouseEventHandler<Element>;
  /**
   * If it exists it is used as the AppBar right icon
   */
  rightIcon?: React.ReactNode;
  /**
   * Called when the righticon is clicked
   */
  onRightIconClick?: React.MouseEventHandler<Element>;
  /**
   * Whether AppBar should be hidden during scroll.
   * @default false
   */
  scrollHide?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: AppBarTheme;
}

@themr(APP_BAR, theme)
export class AppBar extends React.Component<AppBarProps> {
  /*static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    fixed: PropTypes.bool,
    flat: PropTypes.bool,
    leftIcon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    onLeftIconClick: PropTypes.func,
    onRightIconClick: PropTypes.func,
    rightIcon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    scrollHide: PropTypes.bool,
    theme: PropTypes.shape({
      appBar: PropTypes.string,
      inner: PropTypes.string,
      fixed: PropTypes.string,
      flat: PropTypes.string,
      leftIcon: PropTypes.string,
      rightIcon: PropTypes.string,
      scrollHide: PropTypes.string,
      title: PropTypes.string,
    }),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
  };*/
  static defaultProps = {
    className: '',
    fixed: false,
    flat: false,
    scrollHide: false,
  };

  state = {hidden: false, height: 0};

  private curScroll:number;
  private rootNode:Element;

  componentDidMount() {
    if (this.props.scrollHide) {
      this.initializeScroll();
    }
  }

  componentWillReceiveProps(nextProps:AppBarProps) {
    if (!this.props.scrollHide && nextProps.scrollHide) {
      this.initializeScroll();
    }

    if (this.props.scrollHide && !nextProps.scrollHide) {
      this.endScroll();
    }
  }

  componentWillUnmount() {
    if (this.props.scrollHide) {
      this.endScroll();
    }
  }

  initializeScroll() {
    window.addEventListener('scroll', this.handleScroll);
    const {height} = this.rootNode.getBoundingClientRect();
    this.curScroll = window.scrollY;
    this.setState({height});
  }

  endScroll() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollDiff = this.curScroll - window.scrollY;
    const hidden = scrollDiff < 0
      && window.scrollY !== undefined
      && window.scrollY > this.state.height;
    this.setState({hidden});
    this.curScroll = window.scrollY;
  };

  render() {
    const {
      children,
      leftIcon,
      onLeftIconClick,
      onRightIconClick,
      rightIcon,
      theme,
      title,
    } = this.props;

    const className = cn(theme.appBar, {
      [theme.fixed]: this.props.fixed,
      [theme.flat]: this.props.flat,
      [theme.scrollHide]: this.state.hidden,
    }, this.props.className);
    const renderedTitle = typeof title === 'string'
      ? <h1 className={cn(theme.title)}>{title}</h1>
      : title;

    const renderedLeftIcon = leftIcon && (
      <IconButton
        inverse
        className={cn(theme.leftIcon)}
        onClick={onLeftIconClick}
        icon={leftIcon}
      />
    );

    const renderedRightIcon = rightIcon && (
      <IconButton
        inverse
        className={cn(theme.rightIcon)}
        onClick={onRightIconClick}
        icon={rightIcon}
      />
    );

    return (
      <header
        className={className}
        data-react-toolbox="app-bar"
        ref={(node) => {
          this.rootNode = node;
        }}
      >
        <div className={theme.inner}>
          {renderedLeftIcon}
          {renderedTitle}
          {children}
          {renderedRightIcon}
        </div>
      </header>
    );
  }
}

