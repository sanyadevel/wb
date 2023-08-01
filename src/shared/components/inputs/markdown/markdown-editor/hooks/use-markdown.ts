import { useCallback, useRef } from 'react';
import { md } from '../utils';

type MarkerResult = { text: string; selectionStart: number; selectionEnd: number };

type Marker = (text: string, from: number, to: number) => MarkerResult;

export const useMarkdown = (setValue?: (value: string) => void) => {
  const ref = useRef<HTMLInputElement>(null);

  const markText = useCallback(
    (marker: Marker) => {
      const input = ref.current;
      if (input) {
        input.focus();
        const { text, selectionStart, selectionEnd } = marker(
          input.value,
          input.selectionStart || 0,
          input.selectionEnd || 0,
        );
        input.value = text;
        input.setSelectionRange(selectionStart, selectionEnd);
        if (setValue) setValue(input.value);
      }
    },
    [setValue],
  );

  const h1 = useCallback(() => {
    markText(md.h1);
  }, [markText]);
  const h2 = useCallback(() => {
    markText(md.h2);
  }, [markText]);
  const h3 = useCallback(() => {
    markText(md.h3);
  }, [markText]);

  const bold = useCallback(() => {
    markText(md.bold);
  }, [markText]);
  const italic = useCallback(() => {
    markText(md.italic);
  }, [markText]);
  const crossOut = useCallback(() => {
    markText(md.crossOut);
  }, [markText]);
  const code = useCallback(() => {
    markText(md.code);
  }, [markText]);

  const quote = useCallback(() => {
    markText(md.quote);
  }, [markText]);
  const list = useCallback(() => {
    markText(md.list);
  }, [markText]);
  const numberedList = useCallback(() => {
    markText(md.numberedList);
  }, [markText]);

  const link = useCallback(() => {
    markText(md.link);
  }, [markText]);

  const insert = useCallback(
    (insertText: string) => {
      const input = ref.current;
      if (input) {
        input.focus();
        const { text, selectionStart, selectionEnd } = md.insert(
          input.value,
          insertText,
          input.selectionStart || 0,
          input.selectionEnd || 0,
        );
        input.value = text;
        input.setSelectionRange(selectionStart, selectionEnd);
        if (setValue) setValue(input.value);
      }
    },
    [setValue],
  );

  return {
    ref,
    h1,
    h2,
    h3,
    bold,
    italic,
    crossOut,
    code,
    quote,
    list,
    numberedList,
    link,
    insert,
  };
};
