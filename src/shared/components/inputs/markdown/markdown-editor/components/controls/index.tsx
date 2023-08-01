import {
  Divider,
  ToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@mui/material';
import React, { memo, PropsWithChildren } from 'react';
import {
  CodeTwoTone,
  FormatBoldOutlined,
  FormatClearOutlined,
  FormatItalicOutlined,
  FormatListBulletedOutlined,
  FormatListNumberedOutlined,
  FormatQuoteTwoTone,
  InsertLinkOutlined,
  TitleRounded,
} from '@mui/icons-material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import styles from './index.module.scss';

type Props = {
  onBold?: () => void;
  onItalic?: () => void;
  onCrossOut?: () => void;
  onCode?: () => void;
  onQuote?: () => void;
  onLink?: () => void;
  onList?: () => void;
  onNumberedList?: () => void;
  onHeader?: () => void;
  onFile?: () => void;
};

enum Format {
  bold = 'bold',
  italic = 'italic',
  crossedOut = 'crossedOut',
  code = 'code',
  quote = 'quote',
  link = 'link',
  list = 'list',
  numberedList = 'numberedList',
  header = 'header',
  file = 'file',
}

const ToggleButtonGroup = memo((props: Omit<ToggleButtonGroupProps, 'size'>) => {
  return (
    <MuiToggleButtonGroup
      size="small"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      sx={{
        '& .MuiToggleButtonGroup-grouped': {
          border: 0,
        },
        '& .MuiSvgIcon-root': { height: '20px', width: '20px' },
        '& .MuiToggleButton-root': { padding: '2px', border: 'none' },
      }}
    />
  );
});

export const Controls = memo(
  ({
    onBold,
    onItalic,
    onCrossOut,
    onCode,
    onQuote,
    onLink,
    onList,
    onNumberedList,
    onHeader,
    onFile,
  }: PropsWithChildren<Props>) => {
    return (
      <div className={styles.root}>
        <ToggleButtonGroup>
          {onHeader && (
            <ToggleButton onClick={onHeader} value={Format.header}>
              <TitleRounded color="secondary" />
            </ToggleButton>
          )}
        </ToggleButtonGroup>
        <Divider flexItem orientation="vertical" />
        <ToggleButtonGroup>
          {onBold && (
            <ToggleButton onClick={onBold} value={Format.bold}>
              <FormatBoldOutlined color="secondary" />
            </ToggleButton>
          )}
          {onItalic && (
            <ToggleButton onClick={onItalic} value={Format.italic}>
              <FormatItalicOutlined color="secondary" />
            </ToggleButton>
          )}
          {onCrossOut && (
            <ToggleButton onClick={onCrossOut} value={Format.crossedOut}>
              <FormatClearOutlined color="secondary" />
            </ToggleButton>
          )}
        </ToggleButtonGroup>
        <Divider flexItem orientation="vertical" />
        <ToggleButtonGroup>
          {onCode && (
            <ToggleButton onClick={onCode} value={Format.code}>
              <CodeTwoTone color="secondary" />
            </ToggleButton>
          )}
        </ToggleButtonGroup>
        <Divider flexItem orientation="vertical" />
        <ToggleButtonGroup>
          {onQuote && (
            <ToggleButton onClick={onQuote} value={Format.quote}>
              <FormatQuoteTwoTone color="secondary" />
            </ToggleButton>
          )}
          {onList && (
            <ToggleButton onClick={onList} value={Format.list}>
              <FormatListBulletedOutlined color="secondary" />
            </ToggleButton>
          )}
          {onNumberedList && (
            <ToggleButton onClick={onNumberedList} value={Format.numberedList}>
              <FormatListNumberedOutlined color="secondary" />
            </ToggleButton>
          )}
        </ToggleButtonGroup>
        <Divider flexItem orientation="vertical" />
        <ToggleButtonGroup>
          {onLink && (
            <ToggleButton onClick={onLink} value={Format.link}>
              <InsertLinkOutlined color="secondary" />
            </ToggleButton>
          )}
        </ToggleButtonGroup>
        <ToggleButtonGroup>
          {onFile && (
            <ToggleButton onClick={onFile} value={Format.file}>
              <AttachmentIcon color="secondary" />
            </ToggleButton>
          )}
        </ToggleButtonGroup>
      </div>
    );
  },
);
