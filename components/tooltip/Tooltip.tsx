import * as React from 'react';
// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr  from '../utils/themr';
import Portal from '../hoc/Portal';
import { getViewport } from '../utils/utils';
import { TOOLTIP } from '../identifiers';
import events from '../utils/events';

import theme from './theme.css';
import Timer = NodeJS.Timer;

export interface TooltipTheme {
  /**
   * Added to the tooltip element.
   */
  tooltip?: string;
  /**
   * Added to the root when the tooltip is active.
   */
  tooltipActive?: string;
  /**
   * Wrapper for the root element used to position the tooltip.
   */
  tooltipWrapper?: string;
  tooltipInner?:string
}
export interface TooltipProps {
  /**
   * Additional class added to composed component.
   */
  className?: string;
  /**
   * Callback to be invoked when Component is clicked.
   */
  onClick?: Function;
  /**
   * Callback called when the mouse enters the Component.
   */
  onMouseEnter?: Function;
  /**
   * Callback called when the mouse leaves the Component.
   */
  onMouseLeave?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: TooltipTheme;
  /**
   * The text (or node) used for the tooltip.
   */
  tooltip?: React.ReactNode;
  /**
   * Amount of time in miliseconds spent before the tooltip is visible.
   * @default 0
   */
  tooltipDelay?: number;
  /**
   * If true, the Tooltip hides after a click in the host component.
   * @default true
   */
  tooltipHideOnClick?: boolean;
  /**
   * Tooltip position.
   * @default "vertical"
   */
  tooltipPosition?: "bottom" | "top" | "left" | "right" | "horizontal" | "vertical";
  /**
   * Determines the tooltip should be toggled when clicked. This is useful for mobile where there is no mouse enter.
   * @default false
   */
  tooltipShowOnClick?: boolean;
  /**
   * Additional attributes passed to composed component.
   */
  [key: string]: any;
}

export interface TooltipStates {
  active: boolean,
  position: TooltipProps['position'],
  visible: boolean,
  left?:number,
  top?:number
}

const POSITION = {
  BOTTOM: 'bottom',
  HORIZONTAL: 'horizontal',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  VERTICAL: 'vertical',
};

const defaults = {
  className: '',
  delay: 0,
  hideOnClick: true,
  passthrough: true,
  showOnClick: false,
  position: POSITION.VERTICAL,
  theme: theme,
};

export const tooltipFactory = (options = {}) => {
  const {
    className: defaultClassName,
    delay: defaultDelay,
    hideOnClick: defaultHideOnClick,
    showOnClick: defaultShowOnClick,
    passthrough: defaultPassthrough,
    position: defaultPosition,
    theme: defaultTheme,
  } = { ...defaults, ...options };

  return (ComposedComponent) => {
    class TooltippedComponent extends React.Component<TooltipProps,TooltipStates> {
      // static propTypes = {
      //   children: PropTypes.node,
      //   className: PropTypes.string,
      //   onClick: PropTypes.func,
      //   onMouseEnter: PropTypes.func,
      //   onMouseLeave: PropTypes.func,
      //   theme: PropTypes.shape({
      //     tooltip: PropTypes.string,
      //     tooltipActive: PropTypes.string,
      //     tooltipWrapper: PropTypes.string,
      //   }),
      //   tooltip: PropTypes.oneOfType([
      //     PropTypes.string,
      //     PropTypes.node,
      //   ]),
      //   tooltipDelay: PropTypes.number,
      //   tooltipHideOnClick: PropTypes.bool,
      //   tooltipPosition: PropTypes.oneOf(Object.keys(POSITION).map(key => POSITION[key])),
      //   tooltipShowOnClick: PropTypes.bool,
      // };

      private tooltipNode:Element;
      private timeout:Timer;

      static defaultProps = {
        className: defaultClassName,
        tooltipDelay: defaultDelay,
        tooltipHideOnClick: defaultHideOnClick,
        tooltipPosition: defaultPosition,
        tooltipShowOnClick: defaultShowOnClick,
      };

      state = {
        active: false,
        position: this.props.tooltipPosition,
        visible: false,
        top:0,
        left:0
      };

      componentWillUnmount() {
        if (this.tooltipNode) {
          events.removeEventListenerOnTransitionEnded(this.tooltipNode, this.onTransformEnd);
        }
        if (this.timeout) clearTimeout(this.timeout);
      }

      onTransformEnd = (e) => {
        if (e.propertyName === 'transform') {
          events.removeEventListenerOnTransitionEnded(this.tooltipNode, this.onTransformEnd);
          this.setState({ visible: false });
        }
      };

      getPosition(element) {
        const { tooltipPosition } = this.props;
        if (tooltipPosition === POSITION.HORIZONTAL) {
          const origin = element.getBoundingClientRect();
          const { width: ww } = getViewport();
          const toRight = origin.left < ((ww / 2) - (origin.width / 2));
          return toRight ? POSITION.RIGHT : POSITION.LEFT;
        } else if (tooltipPosition === POSITION.VERTICAL) {
          const origin = element.getBoundingClientRect();
          const { height: wh } = getViewport();
          const toBottom = origin.top < ((wh / 2) - (origin.height / 2));
          return toBottom ? POSITION.BOTTOM : POSITION.TOP;
        }
        return tooltipPosition;
      }

      activate({ top, left, position }) {
        if (this.timeout) clearTimeout(this.timeout);
        this.setState({ visible: true, position });
        this.timeout = setTimeout(() => {
          this.setState({ active: true, top, left });
        }, this.props.tooltipDelay);
      }

      deactivate() {
        if (this.timeout) clearTimeout(this.timeout);
        if (this.state.active) {
          events.addEventListenerOnTransitionEnded(this.tooltipNode, this.onTransformEnd);
          this.setState({ active: false });
        } else if (this.state.visible) {
          this.setState({ visible: false });
        }
      }

      calculatePosition(element) {
        const position = this.getPosition(element);
        const { top, left, height, width } = element.getBoundingClientRect();
        const xOffset = window.scrollX || window.pageXOffset;
        const yOffset = window.scrollY || window.pageYOffset;
        if (position === POSITION.BOTTOM) {
          return {
            top: top + height + yOffset,
            left: left + (width / 2) + xOffset,
            position,
          };
        } else if (position === POSITION.TOP) {
          return {
            top: top + yOffset,
            left: left + (width / 2) + xOffset,
            position,
          };
        } else if (position === POSITION.LEFT) {
          return {
            top: top + (height / 2) + yOffset,
            left: left + xOffset,
            position,
          };
        } else if (position === POSITION.RIGHT) {
          return {
            top: top + (height / 2) + yOffset,
            left: left + width + xOffset,
            position,
          };
        }
        return undefined;
      }

      handleMouseEnter = (event) => {
        this.activate(this.calculatePosition(event.currentTarget));
        if (this.props.onMouseEnter) this.props.onMouseEnter(event);
      };

      handleMouseLeave = (event) => {
        this.deactivate();
        if (this.props.onMouseLeave) this.props.onMouseLeave(event);
      };

      handleClick = (event) => {
        if (this.props.tooltipHideOnClick && this.state.active) {
          this.deactivate();
        }

        if (this.props.tooltipShowOnClick && !this.state.active) {
          this.activate(this.calculatePosition(event.currentTarget));
        }

        if (this.props.onClick) this.props.onClick(event);
      };

      render() {
        const { active, left, top, position, visible } = this.state;
        const positionClass = `tooltip${position.charAt(0).toUpperCase() + position.slice(1)}`;
        const {
          children,
          className,
          theme,
          onClick,            // eslint-disable-line no-unused-vars
          onMouseEnter,       // eslint-disable-line no-unused-vars
          onMouseLeave,       // eslint-disable-line no-unused-vars
          tooltip,
          tooltipDelay,       // eslint-disable-line no-unused-vars
          tooltipHideOnClick, // eslint-disable-line no-unused-vars
          tooltipPosition,    // eslint-disable-line no-unused-vars
          tooltipShowOnClick, // eslint-disable-line no-unused-vars
          ...other
        } = this.props;

        const _className = cn(theme.tooltip, {
          [theme.tooltipActive]: active,
          [theme[positionClass]]: theme[positionClass],
        });

        const childProps = {
          ...other,
          className,
          onClick: this.handleClick,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
        };

        const shouldPass = typeof ComposedComponent !== 'string' && defaultPassthrough;
        const finalProps = shouldPass ? { ...childProps, theme } : childProps;

        return React.createElement(ComposedComponent, finalProps, children,
          visible && (
            <Portal>
              <span
                ref={(node) => { this.tooltipNode = node; }}
                className={_className}
                data-react-toolbox="tooltip"
                style={{ top, left }}
              >
                <span className={theme.tooltipInner}>{tooltip}</span>
              </span>
            </Portal>
          ),
        );
      }
    }

    return themr(TOOLTIP, defaultTheme)(TooltippedComponent);
  };
};



export default tooltipFactory;
