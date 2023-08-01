import React, { memo } from 'react';
import {
  ArrowDropDownCircle,
  CheckBoxOutlineBlankTwoTone,
  DateRangeTwoTone,
  FileUploadRounded,
  NotesRounded,
  RadioButtonUncheckedTwoTone,
  ShortTextRounded,
  Filter1,
  CheckBoxTwoTone,
} from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuProps } from 'src/shared/components';

export type AddFieldMenuProps = MenuProps & {
  onTextClick?: () => void;
  onMultiChoiceClick?: () => void;
  onSingleChoiceClick?: () => void;
  onSelectClick?: () => void;
  onInputClick?: () => void;
  onMultiInputClick?: () => void;
  onUploadClick?: () => void;
  onCheckboxClick?: () => void;
  onDateClick?: () => void;
  onNumberClick?: () => void;
};

export const AddFieldMenu = memo(
  ({
    onTextClick,
    onMultiChoiceClick,
    onSingleChoiceClick,
    onSelectClick,
    onInputClick,
    onMultiInputClick,
    onUploadClick,
    onCheckboxClick,
    onDateClick,
    onNumberClick,
    ...rest
  }: AddFieldMenuProps) => {
    return (
      <Menu
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        disableRestoreFocus
      >
        {/*         <MenuItem disabled={!onTextClick} onClick={onTextClick}>
          <ListItemIcon>
            <TextFieldsOutlined color="secondary" />
          </ListItemIcon>
          <ListItemText>Текстовый блок</ListItemText>
        </MenuItem> */}
        <MenuItem disabled={!onMultiChoiceClick} onClick={onMultiChoiceClick}>
          <ListItemIcon>
            <CheckBoxOutlineBlankTwoTone color="secondary" />
          </ListItemIcon>
          <ListItemText>Несколько из списка</ListItemText>
        </MenuItem>
        <MenuItem disabled={!onSingleChoiceClick} onClick={onSingleChoiceClick}>
          <ListItemIcon>
            <RadioButtonUncheckedTwoTone color="secondary" />
          </ListItemIcon>
          <ListItemText>Один из списка</ListItemText>
        </MenuItem>
        <MenuItem disabled={!onSelectClick} onClick={onSelectClick}>
          <ListItemIcon>
            <ArrowDropDownCircle color="secondary" />
          </ListItemIcon>
          <ListItemText>Раскрывающийся список</ListItemText>
        </MenuItem>
        <MenuItem disabled={!onInputClick} onClick={onInputClick}>
          <ListItemIcon>
            <ShortTextRounded color="secondary" />
          </ListItemIcon>
          <ListItemText>Текст (строка)</ListItemText>
        </MenuItem>
        <MenuItem disabled={!onMultiInputClick} onClick={onMultiInputClick}>
          <ListItemIcon>
            <NotesRounded color="secondary" />
          </ListItemIcon>
          <ListItemText>Текст (абзац)</ListItemText>
        </MenuItem>
        <MenuItem disabled={!onUploadClick} onClick={onUploadClick}>
          <ListItemIcon>
            <FileUploadRounded color="secondary" />
          </ListItemIcon>
          <ListItemText>Загрузка файлов</ListItemText>
        </MenuItem>
        <MenuItem disabled={!onCheckboxClick} onClick={onCheckboxClick}>
          <ListItemIcon>
            <CheckBoxTwoTone color="secondary" />
          </ListItemIcon>
          <ListItemText>Чекбокс</ListItemText>
        </MenuItem>
        <MenuItem disabled={!onDateClick} onClick={onDateClick}>
          <ListItemIcon>
            <DateRangeTwoTone color="secondary" />
          </ListItemIcon>
          <ListItemText>Дата</ListItemText>
        </MenuItem>
        <MenuItem disabled={!onNumberClick} onClick={onNumberClick}>
          <ListItemIcon>
            <Filter1 color="secondary" />
          </ListItemIcon>
          <ListItemText>Число</ListItemText>
        </MenuItem>
      </Menu>
    );
  },
);
