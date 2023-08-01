import React, { memo, useMemo } from 'react';
import classnames from 'classnames';
import { TableBody, TableContainer, Table as MaterialUiTable, Box } from '@mui/material';
import { DEFAULT_ROWS_PER_PAGE_OPTIONS, INIT_PAGE_LIMIT } from 'src/constants';
import { noop } from 'src/shared/utils';
import { CircularPreloader } from '../../feedback/circular-preloader';
import { Headers, Row, EmptyRow } from './_components';
import {
  OrderTypes,
  ColumnType,
  RecordType,
  GetRowKeyType,
  GetRowClassnamesType,
  GetColClassnamesType,
  SortEventType,
} from './types';
import cn from './index.module.scss';
import { TablePagination } from '../../navigation';

export type TableProps<T extends RecordType> = {
  columns: Array<ColumnType<T>>;
  data: Array<T>;
  count?: number;
  onRowClick?: (data: T) => void;
  id: string;
  rowKey: keyof T | GetRowKeyType<T>;
  stickyHeader?: boolean;
  page?: number;
  onSetPage?: (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  rowsPerPage?: number;
  onSetRowsPerPage?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  rowsPerPageOptions?: Array<{ value: number; label: string }>;
  sortDir?: OrderTypes;
  sortName?: string;
  onSort?: ({ name, direction }: SortEventType) => void;
  isLoading?: boolean;
  disableFooter?: boolean;
  isFixedLayout?: boolean;
  getRowClassnames?: GetRowClassnamesType<T>;
  getColClassname?: GetColClassnamesType<T>;
  classes?: {
    root?: string;
    container?: string;
    table?: string;
  };
};

const TableWrapper = <T extends RecordType>({
  columns,
  data,
  onRowClick,
  page = 0,
  onSetPage = noop,
  rowsPerPage = INIT_PAGE_LIMIT,
  onSetRowsPerPage = noop,
  count = 0,
  sortDir,
  sortName,
  onSort = noop,
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
  rowKey,
  isLoading = false,
  id,
  disableFooter,
  isFixedLayout = false,
  stickyHeader,
  getRowClassnames,
  getColClassname,
  classes,
}: TableProps<T>) => {
  const getRowKey = useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (row: T) => `${row[rowKey]}`;
  }, [rowKey]);

  return (
    <Box
      className={classnames(cn.root, classes?.root, {
        [cn.root_isLoading]: isLoading,
        [cn.root_fixContent]: isFixedLayout,
      })}
    >
      {isLoading && <CircularPreloader id={`${id}-table-loader`} />}
      <TableContainer className={classnames(cn.container, classes?.container)} id={`${id}-table`}>
        <MaterialUiTable
          className={classnames(classes?.table, {
            [cn.fixedLayout]: isFixedLayout,
          })}
          stickyHeader={stickyHeader}
        >
          <Headers
            columns={columns}
            getColClassname={getColClassname}
            id={id}
            onSort={onSort}
            sortDir={sortDir}
            sortName={sortName}
          />
          <TableBody id={`${id}-table-body`}>
            {data.map((row, index) => (
              <Row
                key={getRowKey(row)}
                columns={columns}
                disableBorder={disableFooter && index === data.length - 1}
                getColClassname={getColClassname}
                getRowClassnames={getRowClassnames}
                index={index}
                onRowClick={onRowClick}
                row={row}
                tableId={id}
              />
            ))}
            {!data.length && <EmptyRow columns={columns.length} disableBorder={disableFooter} />}
          </TableBody>
        </MaterialUiTable>
      </TableContainer>
      {!disableFooter && (
        <TablePagination
          count={count}
          id={id}
          onPageChange={onSetPage}
          onRowsPerPageChange={onSetRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      )}
    </Box>
  );
};

export const Table = memo(TableWrapper) as typeof TableWrapper;
