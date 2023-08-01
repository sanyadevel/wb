import React, { memo, useCallback } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import classnames from 'classnames';
import Typography from '@mui/material/Typography/Typography';
import { ColumnType, GetColClassnamesType, GetRowClassnamesType, RecordType } from '../../types';
import cn from './index.module.scss';

type PropsType<DataType extends RecordType> = {
  row: DataType;
  onRowClick?: (data: DataType, index: number) => void;
  columns: Array<ColumnType<DataType>>;
  tableId: string;
  index: number;
  getRowClassnames?: GetRowClassnamesType<DataType>;
  getColClassname?: GetColClassnamesType<DataType>;
  disableBorder?: boolean;
};

const RowView = <DataType extends RecordType>({
  row,
  onRowClick,
  columns,
  tableId,
  index,
  getRowClassnames = () => ({}),
  getColClassname,
  disableBorder,
}: PropsType<DataType>) => {
  const handleRowClick = useCallback(() => {
    if (onRowClick) {
      onRowClick(row, index);
    }
  }, [index, onRowClick, row]);
  const { classNames, sx } = getRowClassnames(row);

  return (
    <TableRow
      aria-roledescription={`${tableId}-row`}
      className={classnames(cn.root, classNames, {
        [cn.root_clickable]: Boolean(onRowClick),
      })}
      hover
      onClick={handleRowClick}
      sx={sx}
    >
      {columns.map(({ align, render, name, noPadding }) => {
        return (
          <TableCell
            key={name}
            align={align}
            aria-roledescription={`${tableId}-cell-${name}`}
            className={getColClassname && getColClassname(name)}
            sx={{
              borderBottom: '1px solid #F0F2F4',
              border: disableBorder ? 0 : undefined,
              padding: name === 'actions' || noPadding ? 'none' : '13.5px 16px',
              lineHeight: 'unset',
            }}
          >
            {render ? (
              render(row, index)
            ) : (
              <Typography display="block" variant="inherit">
                {row[name]}
              </Typography>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export const Row = memo(RowView) as typeof RowView;
