import React, { ChangeEventHandler, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { Input, InputProps } from '../input';

export type SearchInputProps = InputProps & {
  onSearch?: (value: string) => void;
  initValue?: string;
};

export const SearchInput = memo(({ initValue = '', value, onSearch, onChange, ...restProps }: SearchInputProps) => {
  const [state, setState] = useState(initValue);

  useEffect(() => {
    setState(initValue);
  }, [initValue]);

  const handleDebouncedOnSubmit = useMemo(
    () =>
      debounce((v: string) => {
        if (onSearch) onSearch(v);
      }, 500),
    [onSearch],
  );

  const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>(
    e => {
      const searchValue = e.target.value;
      setState(searchValue);
      handleDebouncedOnSubmit(searchValue);
      if (onChange) onChange(e);
    },
    [handleDebouncedOnSubmit, onChange],
  );

  return (
    <Input
      placeholder="Поиск"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      InputProps={{
        endAdornment: <SearchRounded color="secondary" />,
        ...restProps.InputProps,
      }}
      onChange={handleSearch}
      value={value || state}
    />
  );
});
