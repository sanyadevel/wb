import React, { ChangeEventHandler, memo, useCallback, useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import { AddOutlined, ArrowDropDown, CloseOutlined, SearchRounded, SortOutlined } from '@mui/icons-material';
import cn from 'classnames';
import { cloneDeep, differenceBy } from 'lodash';
import { usePopoverProps } from 'src/shared/hooks';
import { nanoid } from 'nanoid';
import { DEFAULT_SORT_DIRECTION } from 'src/constants';
import styles from './index.module.scss';
import { Menu, MenuItem, Popover } from '../../navigation';
import { Button, ButtonBase, Input } from '../../inputs';
import { DraggableFieldItem } from './components';

type Filter = {
  id: string;
  name: string;
};

type SelectedFilter = {
  id: string;
  name: string;
  dir: 'asc' | 'desc';
};

export type SortProps = {
  allFilters: Array<Filter>;
  selectedFilters: Array<SelectedFilter>;
  onChangeFilters: (filters: Array<SelectedFilter>) => void;
};

export const Sort = memo(({ allFilters, selectedFilters, onChangeFilters }: SortProps) => {
  const [id] = useState(nanoid());
  const [search, setSearch] = useState<string>('');

  const availableFilters = useMemo(
    () => differenceBy(allFilters, selectedFilters, 'id').filter(item => item.name.toLowerCase().includes(search)),
    [allFilters, search, selectedFilters],
  );

  const selectedFilterNames = useMemo(() => selectedFilters.map(item => item.name).join(', '), [selectedFilters]);

  const handleOnAddFilter = useCallback(
    (index: number) => {
      const newFilters = cloneDeep(selectedFilters);
      newFilters.push({ ...availableFilters[index], dir: DEFAULT_SORT_DIRECTION });
      onChangeFilters(newFilters);
    },
    [selectedFilters, availableFilters, onChangeFilters],
  );

  const handleOnDeleteFilter = useCallback(
    (index: number) => {
      const newFilters = cloneDeep(selectedFilters);
      newFilters.splice(index, 1);
      onChangeFilters(newFilters);
    },
    [selectedFilters, onChangeFilters],
  );

  const handleOnChangeSortDir = useCallback(
    (index: number) => {
      const newFilters = cloneDeep(selectedFilters);
      newFilters[index].dir = newFilters[index].dir === 'asc' ? 'desc' : 'asc';
      onChangeFilters(newFilters);
    },
    [selectedFilters, onChangeFilters],
  );

  const handleOnMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newFilters = cloneDeep(selectedFilters);
      [newFilters[dragIndex], newFilters[hoverIndex]] = [newFilters[hoverIndex], newFilters[dragIndex]];
      onChangeFilters(newFilters);
    },
    [onChangeFilters, selectedFilters],
  );

  const {
    anchorElement: selectedFiltersEl,
    handleOpen: openSelectedFilters,
    handleClose: closeSelectedFilters,
    isOpen: isOpenSelectedFilters,
  } = usePopoverProps();

  const {
    anchorElement: availableFiltersEl,
    handleOpen: openAvailableFilters,
    handleClose: closeAvailableFilters,
    isOpen: isOpenAvailableFilters,
  } = usePopoverProps();

  const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>(e => {
    setSearch(e.target.value.toLowerCase());
  }, []);

  return (
    <div className={styles.root}>
      <Typography color="secondary" variant="text">
        Сортировать по:
      </Typography>
      <Typography noWrap variant="text">
        {selectedFilterNames}
      </Typography>
      <ButtonBase onClick={openSelectedFilters}>
        <ArrowDropDown className={cn(styles.icon, { [styles.icon_open]: isOpenSelectedFilters })} />
      </ButtonBase>
      <Popover
        anchorEl={selectedFiltersEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={closeSelectedFilters}
        open={isOpenSelectedFilters}
      >
        <div className={styles.list}>
          {selectedFilters.map((item, index) => (
            <DraggableFieldItem key={item.id} index={index} listName={id} onMove={handleOnMove}>
              <div className={styles.item}>
                <Typography variant="text">{item.name}</Typography>
                <div className={styles.buttonWrapper}>
                  <ButtonBase onClick={() => handleOnChangeSortDir(index)}>
                    <SortOutlined className={cn(styles.sortIcon, { [styles.sortIcon_asc]: item.dir === 'asc' })} />
                  </ButtonBase>
                </div>
                <div className={styles.buttonWrapper}>
                  <ButtonBase onClick={() => handleOnDeleteFilter(index)}>
                    <CloseOutlined />
                  </ButtonBase>
                </div>
              </div>
            </DraggableFieldItem>
          ))}
          <Button onClick={openAvailableFilters} startIcon={<AddOutlined />} variant="text">
            Добавить сортировку
          </Button>
        </div>
      </Popover>
      <Menu anchorEl={availableFiltersEl} onClose={closeAvailableFilters} open={isOpenAvailableFilters}>
        <div className={styles.inputWrapper}>
          <Input
            autoFocus
            InputProps={{ endAdornment: <SearchRounded color="secondary" /> }}
            onChange={handleOnChange}
            placeholder="Поиск"
            value={search}
          />
        </div>
        <div className={styles.searchResult}>
          {availableFilters.map((item, index) => (
            <MenuItem key={item.id} onClick={() => handleOnAddFilter(index)}>
              {item.name}
            </MenuItem>
          ))}
        </div>
      </Menu>
    </div>
  );
});
