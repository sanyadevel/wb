import React, { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, Typography } from '@mui/material';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import styles from './index.module.scss';

type Props = {
  value: string;
};

const getComponents = (): ReactMarkdownOptions['components'] => ({
  strong: ({ children }) => (
    <Typography component="strong" fontSize="13px">
      {children}
    </Typography>
  ),
  em: ({ children }) => (
    <Typography component="em" fontSize="13px">
      {children}
    </Typography>
  ),
  del: ({ children }) => (
    <Typography component="del" fontSize="13px">
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography component="p" fontSize="13px">
      {children}
    </Typography>
  ),
  code: ({ children }) => (
    <Typography component="code" fontSize="13px">
      {children}
    </Typography>
  ),
  blockquote: ({ children }) => (
    <Typography component="blockquote" fontSize="13px">
      {children}
    </Typography>
  ),
  li: ({ children }) => (
    <Typography component="li" fontSize="13px">
      {children}
    </Typography>
  ),
  a: ({ children, ...props }) => (
    <Link
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Link>
  ),
  img: ({ ...props }) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  ),
  h1: ({ children }) => <Typography variant="h3">{children}</Typography>,
  h2: ({ children }) => <Typography variant="h3">{children}</Typography>,
  h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
  h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
  h5: ({ children }) => <Typography variant="subtitle">{children}</Typography>,
  h6: ({ children }) => <Typography variant="subtitle">{children}</Typography>,
});

export const MarkdownView = memo(({ value }: Props) => {
  const components = useMemo(() => getComponents(), []);

  return (
    <ReactMarkdown className={styles.root} components={components} linkTarget="_blank" remarkPlugins={[remarkGfm]}>
      {value}
    </ReactMarkdown>
  );
});
