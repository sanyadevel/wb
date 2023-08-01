import { Link } from '@mui/material';
import React, { memo } from 'react';
import { getLink } from '../../../_utils/get-link';
import { Value } from '../types';
import styles from './index.module.scss';

type Props = {
  value: Value;
};

export const TableView = memo(({ value }: Props) => {
  return (
    <div className={styles.root}>
      {value.map((item, index) => (
        <div>
          <Link key={item.id} download={item.name} href={getLink(item.id)} target="_blank" variant="text">
            {item.name}
          </Link>
          {value.length > 1 ? ',' : ''}
        </div>
      ))}
    </div>
  );
});
