import React, { ChangeEventHandler, KeyboardEventHandler, memo, useCallback, useMemo, useRef, useState } from 'react';
import { CircularProgress, debounce } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import styles from './index.module.scss';
import { MenuItem } from '../../navigation/menu-item';
import { Select, SelectProps as SelectProperties } from '../select';
import { Input } from '../input';

export type SelectWithSearchProps = SelectProperties & {
  onSearch?: (value: string) => void;
  debouncedOnSearch?: (value: string) => void;
  isLoadingMenu?: boolean;
};

export const SelectWithSearch = memo(
  ({
    children,
    SelectProps,
    isLoading,
    onSearch,
    debouncedOnSearch,
    isLoadingMenu,
    ...rest
  }: SelectWithSearchProps) => {
    const [search, setSearch] = useState<string>('');

    const handleDebouncedOnSubmit = useMemo(
      () =>
        debounce((value: string) => {
          if (debouncedOnSearch) debouncedOnSearch(value);
        }, 500),
      [debouncedOnSearch],
    );

    const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>(
      e => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        handleDebouncedOnSubmit(searchValue);
        if (onSearch) onSearch(searchValue);
      },
      [handleDebouncedOnSubmit, onSearch],
    );

    const inputRef = useRef<HTMLInputElement>(null);
    const handleOpenMenu = useCallback(() => {
      inputRef.current?.focus();
    }, []);
    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(e => {
      // Prevent MUI-Autoselect while typing
      e.stopPropagation();
    }, []);

    const isEmptyList = (Array.isArray(children) && !children.length) || !children;

    const emptyContent = <MenuItem>Ничего не найдено</MenuItem>;

    const loadingContent = (
      <MenuItem>
        <div className={styles.root}>
          <CircularProgress className={styles.preloader} size={24} />
        </div>
      </MenuItem>
    );

    let content = children;

    if (isLoadingMenu) {
      content = loadingContent;
    } else if (isEmptyList) {
      content = emptyContent;
    }

    return (
      <Select
        isLoading={isLoading}
        SelectProps={{
          ...SelectProps,
          MenuProps: {
            disableAutoFocusItem: true,
            MenuListProps: {
              subheader: (
                <Input
                  InputProps={{ endAdornment: <SearchRounded color="secondary" /> }}
                  inputRef={inputRef}
                  onChange={handleSearch}
                  onKeyDown={handleKeyDown}
                  onMount={handleOpenMenu}
                  placeholder="Поиск"
                  value={search}
                />
              ),
            },
          },
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {content}
      </Select>
    );
  },
);
