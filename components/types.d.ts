import * as React from "react";

export declare namespace ReactToolbox {
  interface Props extends React.Attributes {
    /**
     * Set a class for the root component.
     */
    className?: string;
    /**
     * Callback called when the component is clicked.
     */
    onClick?: React.MouseEventHandler<Element>;
    /**
     * Fires after the mouse is released from the Component.
     */
    onMouseUp?: React.MouseEventHandler<Element>;
    /**
     * Callback called when the mouse enters the Component.
     */
    onMouseEnter?: React.MouseEventHandler<Element>;
    /**
     * Callback called when the mouse leaves the Component.
     */
    onMouseLeave?: React.MouseEventHandler<Element>;
    /**
     * Callback called when the mouse press the Component.
     */
    onMouseDown?: React.MouseEventHandler<Element>;
    onContextMenu?: React.MouseEventHandler<Element>;
    onDoubleClick?: React.MouseEventHandler<Element>;
    onDrag?: React.DragEventHandler<Element>;
    onDragEnd?: React.DragEventHandler<Element>;
    onDragEnter?: React.DragEventHandler<Element>;
    onDragExit?: React.DragEventHandler<Element>;
    onDragLeave?: React.DragEventHandler<Element>;
    onDragOver?: React.DragEventHandler<Element>;
    onDragStart?: React.DragEventHandler<Element>;
    onDrop?: React.DragEventHandler<Element>;
    onMouseMove?: React.MouseEventHandler<Element>;
    onMouseOut?:React.MouseEventHandler<Element>;
    onMouseOver?: React.MouseEventHandler<Element>;
    onTouchCancel?: React.TouchEventHandler<Element>;
    onTouchEnd?: React.TouchEventHandler<Element>;
    onTouchMove?: React.TouchEventHandler<Element>;
    onTouchStart?: React.TouchEventHandler<Element>;
    /**
     * Set inline style for the root component.
     */
    style?: React.CSSProperties;

  }
}

export default ReactToolbox;
