import classNames from 'classnames';
import React, { memo, PropsWithChildren, useCallback, useRef, useState } from 'react';
import { DrugAndDropIcon } from 'src/shared/components';
import styles from './index.module.scss';
import { FieldBlock, FieldBlockProps } from '../field-block';
import { useDragNDrop } from './use-drug-n-drop';

export type DraggableFieldBlockProps = FieldBlockProps & {
  listName: string;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
};

/* eslint-disable react/jsx-props-no-spreading */
export const DraggableFieldBlock = memo(
  ({
    listName,
    index,
    onMove,
    onAdd,
    onCopy,
    onDelete,
    onBlur,
    onMouseOver,
    onMouseOut,
    onClick,
    focused,
    warning,
    children,
  }: PropsWithChildren<DraggableFieldBlockProps>) => {
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

    const onMouseOverHandler = useCallback(() => {
      setHover(true);
      if (onMouseOver) onMouseOver();
    }, [onMouseOver]);

    const onMouseOutHandler = useCallback(() => {
      setHover(false);
      if (onMouseOut) onMouseOut();
    }, [onMouseOut]);

    return (
      <div
        ref={rootRef}
        className={classNames(styles.root, {
          [styles.root_isDragging]: isDragging,
        })}
        data-handler-id={handlerId}
      >
        <FieldBlock
          focused={focused}
          onAdd={onAdd}
          onBlur={onBlur}
          onClick={onClick}
          onCopy={onCopy}
          onDelete={onDelete}
          onMouseOut={onMouseOutHandler}
          onMouseOver={onMouseOverHandler}
          warning={warning}
        >
          <div className={styles.wrapper}>
            <div
              ref={handleRef}
              className={classNames(styles.dragHandle, {
                [styles.dragHandle_isDragging]: isDragging,
                [styles.dragHandle_visible]: focused || hover,
              })}
            >
              <DrugAndDropIcon color="secondary" fontSize="small" />
            </div>
            {children}
          </div>
        </FieldBlock>
      </div>
    );
  },
);
