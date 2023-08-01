import { Grow } from '@mui/material';
import React, { memo, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { FIELD_ANIMATION_DURATION } from 'src/constants';
import { DraggableFieldBlock, DraggableFieldBlockProps } from '../../../../draggable-field-block';
import { FieldPresetMatcher } from '../../../../field-preset-matcher';

type Props = {
  fieldName: string;
  fieldType: string;
  index: number;
  listName: string;
  onAdd: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, fieldIndex: number) => void;
  onBlur: (fieldIndex: number) => void;
  onCopy: (fieldIndex: number) => void;
  onDelete: (fieldIndex: number) => void;
  onFocus: (fieldIndex: number) => void;
  onMove: DraggableFieldBlockProps['onMove'];
  warning: boolean;
  focused: boolean;
};

export const FieldListItem = memo(
  ({
    fieldName,
    fieldType,
    index,
    listName,
    onAdd,
    onBlur,
    onCopy,
    onDelete,
    onFocus,
    onMove,
    warning,
    focused,
  }: Props) => {
    const onAddHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
      event => {
        onAdd(event, index);
      },
      [index, onAdd],
    );

    const onBlurHandler = useCallback(() => {
      onBlur(index);
    }, [index, onBlur]);

    const onCopyHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
      onCopy(index);
    }, [index, onCopy]);

    const onFocusHandler = useCallback(() => {
      onFocus(index);
    }, [index, onFocus]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

    const onDeleteHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
      event => {
        event.stopPropagation();
        setMounted(false);
        setTimeout(() => {
          onDelete(index);
        }, FIELD_ANIMATION_DURATION);
      },
      [index, onDelete],
    );

    return (
      <Grow in={mounted} timeout={FIELD_ANIMATION_DURATION}>
        <div>
          <DraggableFieldBlock
            focused={focused}
            index={index}
            listName={listName}
            onAdd={onAddHandler}
            onBlur={onBlurHandler}
            onClick={onFocusHandler}
            onCopy={warning ? undefined : onCopyHandler}
            onDelete={onDeleteHandler}
            onMove={onMove}
            warning={warning}
          >
            <FieldPresetMatcher fieldName={fieldName} fieldType={fieldType} />
          </DraggableFieldBlock>
        </div>
      </Grow>
    );
  },
);
