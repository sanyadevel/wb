import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { FormHelperText, Input, InputProps, LinearProgress, useTheme } from '@mui/material';
import { nanoid } from 'nanoid';
import cn from 'classnames';
import { formatBytes } from 'src/shared/utils';
import { useFocus, useMarkdown } from './hooks';
import { Controls } from './components/controls';
import { DndWrapper, InnerRef } from './components';
import styles from './index.module.scss';
import { getLink } from './utils/get-link';
import { HelpTooltip } from '../../../other/help-tooltip';

type FileType = {
  id: string;
  name: string;
  type: string;
  size: number;
};

type Upload = (file: File) => Promise<FileType>;

export type MarkdownEditorProps = InputProps & {
  setValue?: (value: string) => void;
  upload?: Upload;
} & { errorText?: string; hint?: string; helperText?: string; label?: string };

export const MarkdownEditor = memo(
  ({ errorText, hint, helperText, label, disabled, setValue, upload, ...rest }: MarkdownEditorProps) => {
    const theme = useTheme();
    const { error, label: labelColor, disabledText } = theme.palette.input;

    const { ref, h1, bold, italic, crossOut, code, quote, link, list, numberedList, insert } = useMarkdown(setValue);

    const dndWrapperRef = useRef<InnerRef | null>(null);

    const { ref: blockRef, focused } = useFocus();

    const [uploadingAmount, setUploadingAmount] = useState(0);

    const handleOnDrop = useCallback(
      (acceptedFiles: Array<File>) => {
        if (!upload) return;

        acceptedFiles.forEach(async acceptedFile => {
          setUploadingAmount(old => old + 1);
          upload(acceptedFile)
            .then(data => {
              const fileLink = getLink(data.id);
              const isImage = data.type.startsWith('image');
              const [name] = data.name.split('.');
              let insertText;
              if (isImage) insertText = `![${name}](${fileLink})`;
              else insertText = `[${data.name} (${formatBytes(data.size)})](${fileLink})`;
              insert(insertText);
            })
            .finally(() => {
              setUploadingAmount(old => old - 1);
            });
        });
      },
      [upload, insert],
    );

    const handleOnFile = useCallback(() => {
      if (dndWrapperRef.current) {
        dndWrapperRef.current?.open();
      }
    }, [dndWrapperRef]);

    const loaderList = useMemo(() => {
      const result: Array<React.ReactElement> = [];

      for (let i = 0; i < uploadingAmount; i += 1) {
        result.push(<LinearProgress key={nanoid()} />);
      }
      return result;
    }, [uploadingAmount]);

    return (
      <div ref={blockRef} className={styles.root}>
        <FormHelperText sx={{ color: disabled ? disabledText : labelColor }} variant="outlined">
          {label}
        </FormHelperText>
        <div className={cn(styles.markdownInput, { [styles.markdownInput_focused]: focused })}>
          <div className={styles.inputWrapper}>
            <Controls
              onBold={bold}
              onCode={code}
              onCrossOut={crossOut}
              onFile={handleOnFile}
              onHeader={h1}
              onItalic={italic}
              onLink={link}
              onList={list}
              onNumberedList={numberedList}
              onQuote={quote}
            />
            <DndWrapper innerRef={dndWrapperRef} onDrop={handleOnDrop}>
              <Input
                inputRef={ref}
                minRows={3}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
              />
            </DndWrapper>
          </div>
          {hint && <HelpTooltip>{hint}</HelpTooltip>}
        </div>
        {errorText && !disabled && (
          <FormHelperText sx={{ color: error }} variant="outlined">
            {errorText}
          </FormHelperText>
        )}
        {helperText && (
          <FormHelperText sx={{ color: disabled ? disabledText : labelColor }} variant="outlined">
            {helperText}
          </FormHelperText>
        )}
        {loaderList.length > 0 && <div className={styles.loaderList}>{loaderList}</div>}
      </div>
    );
  },
);
