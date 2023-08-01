import React from 'react';
import { createSvgIcon } from '@mui/material';

export const DrugAndDropIcon = createSvgIcon(
  <>
    <path d="M10 9C9.44772 9 9 9.44772 9 10V18C9 18.5523 9.44772 19 10 19H18C18.5523 19 19 18.5523 19 18V10C19 9.44772 18.5523 9 18 9H10ZM7 10C7 8.34315 8.34315 7 10 7H18C19.6569 7 21 8.34315 21 10V18C21 19.6569 19.6569 21 18 21H10C8.34315 21 7 19.6569 7 18V10Z" />
    <path
      clipRule="evenodd"
      d="M9 10C9 9.44772 9.44772 9 10 9H18C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H10C9.44772 19 9 18.5523 9 18V10Z"
      fillRule="evenodd"
      opacity={0.3}
    />
    <path
      d="M4 4V4.01M8 4V4.01M12 4V4.01M16 4V4.01M4 8V8.01M4 12V12.01M4 16V16.01"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </>,
  'DrugAndDrop',
);
