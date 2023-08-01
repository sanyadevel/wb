import { Identifier, XYCoord } from 'dnd-core';
import { RefObject } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragSourceMonitor, DropTargetMonitor } from 'react-dnd/dist/types';

type DragItem = {
  index: number;
  type: string;
};

type Params = {
  type: string;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  rootRef: RefObject<HTMLElement>;
  onDrop?: () => void;
};

export const useDragNDrop = (params: Params) => {
  const { index, type, onMove, rootRef, onDrop } = params;
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: type,
    collect: (monitor: DropTargetMonitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!rootRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = rootRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
    drop: (item, monitor) => {
      if (onDrop) onDrop();
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type,
    item: () => ({ index }),
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return {
    drag,
    drop,
    dragPreview,
    isDragging,
    handlerId,
  };
};
