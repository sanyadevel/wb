import classNames from 'classnames';
import React, { memo, PropsWithChildren, useCallback, useRef, useState } from 'react';
import { useDragNDrop } from 'src/shared/hooks';
import { DrugAndDropIcon } from 'src/shared/components';
import styles from './index.module.scss';
import { FieldItem, FieldItemProps } from '../field-item';

export type DraggableFieldItemProps = FieldItemProps & {
  listName: string;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
};

/* eslint-disable react/jsx-props-no-spreading */
export const DraggableFieldItem = memo(
  ({
    listName,
    index,
    onMove,
    onDelete,
    onMouseOver,
    onMouseOut,
    onBlur,
    onFocus,
    warning,
    children,
  }: PropsWithChildren<DraggableFieldItemProps>) => {
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

    const [hover, setHover] = useState<boolean>(false);
    const [focused, setFocused] = useState<boolean>(false);

    const onMouseOverHandler = useCallback(() => {
      setHover(true);
      if (onMouseOver) onMouseOver();
    }, [onMouseOver]);

    const onMouseOutHandler = useCallback(() => {
      setHover(false);
      if (onMouseOut) onMouseOut();
    }, [onMouseOut]);

    const onFocusHandler = useCallback(() => {
      setFocused(true);
      if (onFocus) onFocus();
    }, [onFocus]);

    const onBlurHandler = useCallback(() => {
      setFocused(false);
      if (onBlur) onBlur();
    }, [onBlur]);

    return (
      <div
        ref={rootRef}
        className={classNames(styles.root, {
          [styles.root_isDragging]: isDragging,
        })}
        data-handler-id={handlerId}
      >
        <FieldItem
          onBlur={onBlurHandler}
          onDelete={onDelete}
          onFocus={onFocusHandler}
          onMouseOut={onMouseOutHandler}
          onMouseOver={onMouseOverHandler}
          warning
        >
          <div className={styles.wrapper}>
            {children}
            <div
              ref={handleRef}
              className={classNames(styles.dragHandle, {
                [styles.dragHandle_isDragging]: isDragging,
                [styles.dragHandle_visible]: hover || focused,
              })}
            >
              <DrugAndDropIcon color="secondary" fontSize="small" />
            </div>
          </div>
        </FieldItem>
      </div>
    );
  },
);
