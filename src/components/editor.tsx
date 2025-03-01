'use client';
import { Block } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { useTheme } from 'next-themes';

interface EditorProps {
  onChange: (value: Block[]) => void;
  initialContent?: Block[];
  editable?: boolean;
}

export default function Editor({
  onChange,
  initialContent,
  editable,
}: EditorProps) {
  const { resolvedTheme } = useTheme();
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    // add initial content if provided and length is greater than 0
    initialContent: initialContent?.length ? initialContent : undefined,
  });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editable={editable}
      onChange={() => {
        if (onChange) {
          onChange(editor.document);
        }
      }}
      emojiPicker
      tableHandles
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      editor={editor}
    />
  );
}
