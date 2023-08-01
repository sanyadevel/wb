import { CircularProgress } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { cloneDeep } from 'lodash';
import { Accept } from 'react-dropzone';
import { HelpTooltip } from 'src/shared/components';
import { DndArea } from '../dnd-area';
import { FileType, S3FilePreview } from '../s3-file-preview';
import styles from './index.module.scss';

type Props = {
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
  accept?: Accept;
  onChange?: (files: Array<FileType>) => void;
  hint?: string;
  upload?: (file: File) => Promise<FileType>;
  initFiles?: Array<FileType>;
};

export const S3DndArea = memo(
  ({ onChange, hint, disabled, maxFiles, maxSize, accept, upload, initFiles = [] }: Props) => {
    const [uploadingAmount, setUploadingAmount] = useState(0);
    const [files, setFiles] = useState<Array<FileType>>(initFiles);

    const dropMaxCount = maxFiles && maxFiles > 0 ? maxFiles - files.length : Infinity;

    const switchedOff = disabled || dropMaxCount === 0;

    useEffect(() => {
      setFiles(initFiles);
    }, [initFiles]);

    useEffect(() => {
      if (onChange) onChange(files);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    const handleOnDrop = useCallback(
      (acceptedFiles: Array<File>) => {
        if (!upload) return;

        acceptedFiles.forEach(async acceptedFile => {
          setUploadingAmount(old => old + 1);
          upload(acceptedFile)
            .then(data => {
              setFiles(old => [...old, data]);
            })
            .finally(() => {
              setUploadingAmount(old => old - 1);
            });
        });
      },
      [upload],
    );

    const handleOnDelete = useCallback(
      (file: FileType) => {
        const index = files.findIndex(item => file.id === item.id);
        if (index > -1) {
          const newFiles = cloneDeep(files);
          newFiles.splice(index, 1);
          setFiles(newFiles);
        }
      },
      [files],
    );

    const loaderList = useMemo(() => {
      const list: Array<React.ReactElement> = [];

      for (let i = 0; i < uploadingAmount; i += 1) {
        list.push(
          <div key={nanoid()} className={styles.loader}>
            <CircularProgress color="secondary" />
          </div>,
        );
      }
      return list;
    }, [uploadingAmount]);

    return (
      <div className={styles.root}>
        <div className={styles.dndArea}>
          <div className={styles.wrapper}>
            <DndArea
              accept={accept}
              disabled={switchedOff}
              maxFiles={dropMaxCount}
              maxSize={maxSize}
              onDrop={handleOnDrop}
            />
          </div>
          {hint && <HelpTooltip>{hint}</HelpTooltip>}
        </div>
        <div className={styles.previewList}>
          {files.map(file => (
            <S3FilePreview key={file.id} file={file} onDelete={handleOnDelete} />
          ))}
          {loaderList}
        </div>
      </div>
    );
  },
);
