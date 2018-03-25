import * as React from "react";

//import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr  from '../utils/themr';
import { OVERLAY } from '../identifiers';
import theme from './theme.css';

export interface OverlayTheme {
  /**
   * Active class name.
   */
  active?: string;
  /**
   * Backdrop class name.
   */
  backdrop?: string;
  /**
   * Invisible class name.
   */
  invisible?: string;
  /**
   * Overlay class name.
   */
  overlay?: string;
}


export interface OverlayProps {
  /**
   * Whether overlay is active.
   */
  active?: boolean;
  /**
   * Nodes to be nested inside Overlay.
   */
  children?: React.ReactNode;
  /**
   * Additional class name(s) for root container.
   */
  className?: string;
  /**
   * Whether Overlay should have 'invisible' styles.
   * @default false
   */
  invisible?: boolean;
  /**
   * Callback invoked on Overlay click.
   */
  onClick?: Function;
  /**
   * Callback invoked on ESC key.
   */
  onEscKeyDown?: Function;
  /**
   * Overlay theme.
   */
  theme?: OverlayTheme;
  themeNamespace?: string;

  lockScroll?:boolean;
}


@themr(OVERLAY, theme)
export class Overlay extends React.Component<OverlayProps> {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   lockScroll: PropTypes.bool,
  //   onClick: PropTypes.func,
  //   onEscKeyDown: PropTypes.func,
  //   theme: PropTypes.shape({
  //     active: PropTypes.string,
  //     backdrop: PropTypes.string,
  //     overlay: PropTypes.string,
  //   }),
  // };

  static defaultProps = {
    lockScroll: true,
  };

  componentDidMount() {
    const { active, lockScroll, onEscKeyDown } = this.props;
    if (onEscKeyDown) document.body.addEventListener('keydown', this.handleEscKey);
    if (active && lockScroll) document.body.style.overflow = 'hidden';
  }

  componentWillUpdate(nextProps) {
    if (this.props.lockScroll) {
      const becomingActive = nextProps.active && !this.props.active;
      const becomingUnactive = !nextProps.active && this.props.active;

      if (becomingActive) {
        document.body.style.overflow = 'hidden';
      }

      if (becomingUnactive && !document.querySelectorAll('[data-react-toolbox="overlay"]')[1]) {
        document.body.style.overflow = '';
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.onEscKeyDown) {
      if (this.props.active && !prevProps.active) {
        document.body.addEventListener('keydown', this.handleEscKey);
      } else if (!this.props.active && prevProps.active) {
        document.body.removeEventListener('keydown', this.handleEscKey);
      }
    }
  }

  componentWillUnmount() {
    if (this.props.active && this.props.lockScroll) {
      if (!document.querySelectorAll('[data-react-toolbox="overlay"]')[1]) {
        document.body.style.overflow = '';
      }
    }

    if (this.props.onEscKeyDown) {
      document.body.removeEventListener('keydown', this.handleEscKey);
    }
  }

  handleEscKey = (e) => {
    if (this.props.active && this.props.onEscKeyDown && e.which === 27) {
      this.props.onEscKeyDown(e);
    }
  };

  handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  render() {
    const { active, className, lockScroll, theme, onEscKeyDown, ...other } = this.props; // eslint-disable-line
    return (
      <div
        {...other}
        onClick={this.handleClick}
        className={cn(theme.overlay, {
          [theme.active]: active,
        }, className)}
      />
    );
  }
}

export default Overlay;
