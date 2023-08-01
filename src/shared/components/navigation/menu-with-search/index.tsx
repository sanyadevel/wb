import React, { ChangeEventHandler, KeyboardEventHandler, useCallback, useMemo, useState, useRef } from 'react';
import { SearchRounded } from '@mui/icons-material';
import { CircularProgress, debounce } from '@mui/material';
import styles from './index.module.scss';
import { MenuItem } from '../menu-item';
import { Menu, MenuProps } from '../menu';
import { Input } from '../../inputs';

type MenuWithSearchProps = MenuProps & {
  onSearch?: (value: string) => void;
  debouncedOnSearch?: (value: string) => void;
  isLoading?: boolean;
};

export const MenuWithSearch = ({
  onSearch,
  debouncedOnSearch,
  isLoading,
  children,
  ...restProps
}: MenuWithSearchProps) => {
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

  if (isLoading) {
    content = loadingContent;
  } else if (isEmptyList) {
    content = emptyContent;
  }

  return (
    <Menu
      disableAutoFocusItem
      MenuListProps={{
        subheader: (
          <Input
            autoFocus
            InputProps={{ endAdornment: <SearchRounded color="secondary" /> }}
            inputRef={inputRef}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            onMount={handleOpenMenu}
            placeholder="Поиск"
            value={search}
          />
        ),
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      {content}
    </Menu>
  );
};
