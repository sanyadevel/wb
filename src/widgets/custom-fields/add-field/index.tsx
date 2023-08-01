import React, { memo, useCallback } from 'react';
import { AddFieldMenu, AddFieldMenuProps } from '../add-field-menu';
import { checkboxField, dateField, inputField, numberField, questionField, selectField, uploadField } from '../_fields';
import { FieldType } from '../_types';

type Props = {
  anchorEl: AddFieldMenuProps['anchorEl'];
  onClose: () => void;
  open: AddFieldMenuProps['open'];
  onAdd: (filed: FieldType) => void;
};

export const AddField = memo(({ anchorEl, onClose, open, onAdd }: Props) => {
  /*   const onTextClickHandler = useCallback(() => {
    onClose();
    onAdd(textField.getInit());
  }, [onClose, onAdd]); */

  const onInputClickHandler = useCallback(() => {
    onClose();
    onAdd(inputField.getInit(false));
  }, [onAdd, onClose]);

  const onMultiInputClickHandler = useCallback(() => {
    onClose();
    onAdd(inputField.getInit(true));
  }, [onClose, onAdd]);

  const onDateClickHandler = useCallback(() => {
    onClose();
    onAdd(dateField.getInit());
  }, [onAdd, onClose]);

  const onMultiChoiceClickHandler = useCallback(() => {
    onClose();
    onAdd(questionField.getInit(true));
  }, [onAdd, onClose]);

  const onSelectClickHandler = useCallback(() => {
    onClose();
    onAdd(selectField.getInit(false));
  }, [onAdd, onClose]);

  const onSingleChoiceClickHandler = useCallback(() => {
    onClose();
    onAdd(questionField.getInit(false));
  }, [onAdd, onClose]);

  const onUploadClickHandler = useCallback(() => {
    onClose();
    onAdd(uploadField.getInit());
  }, [onAdd, onClose]);

  const onCheckboxClickHandler = useCallback(() => {
    onClose();
    onAdd(checkboxField.getInit());
  }, [onAdd, onClose]);

  const onNumberClickHandler = useCallback(() => {
    onClose();
    onAdd(numberField.getInit());
  }, [onAdd, onClose]);

  return (
    <AddFieldMenu
      anchorEl={anchorEl}
      onCheckboxClick={onCheckboxClickHandler}
      onClose={onClose}
      onDateClick={onDateClickHandler}
      onInputClick={onInputClickHandler}
      onMultiChoiceClick={onMultiChoiceClickHandler}
      onMultiInputClick={onMultiInputClickHandler}
      onNumberClick={onNumberClickHandler}
      onSelectClick={onSelectClickHandler}
      onSingleChoiceClick={onSingleChoiceClickHandler}
      /*  onTextClick={onTextClickHandler} */
      onUploadClick={onUploadClickHandler}
      open={open}
    />
  );
});
