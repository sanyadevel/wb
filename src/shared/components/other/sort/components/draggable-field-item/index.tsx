import classNames from 'classnames';
import React, { memo, PropsWithChildren, useRef } from 'react';
import { DragIndicatorOutlined } from '@mui/icons-material';
import { useDragNDrop } from 'src/shared/hooks';
import styles from './index.module.scss';
import { FieldItem, FieldItemProps } from '../field-item';

export type DraggableFieldItemProps = FieldItemProps & {
  listName: string;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
};

/* eslint-disable react/jsx-props-no-spreading */
export const DraggableFieldItem = memo(
  ({ listName, index, onMove, children }: PropsWithChildren<DraggableFieldItemProps>) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const { isDragging, drag, dragPreview, drop, handlerId } = useDragNDrop({
      index,
      type: listName,
      onMove,
      rootRef,
    });

    dragPreview(drop(rootRef));
    drag(handleRef);

    return (
      <div
        ref={rootRef}
        className={classNames(styles.root, {
          [styles.root_isDragging]: isDragging,
        })}
        data-handler-id={handlerId}
      >
        <FieldItem>
          <div className={styles.wrapper}>
            <div
              ref={handleRef}
              className={classNames(styles.dragHandle, {
                [styles.dragHandle_isDragging]: isDragging,
              })}
            >
              <DragIndicatorOutlined color="secondary" />
            </div>
            {children}
          </div>
        </FieldItem>
      </div>
    );
  },
);
