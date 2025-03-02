'use client';
import React, { useCallback } from 'react';
import { debounce } from 'lodash';
import { MotionDocument } from '../types/document';

export const DocumentTitle = ({
  document,
  onChange,
}: {
  document: MotionDocument;
  onChange: (title: string) => void;
}) => {
  const debouncedOnChange = useCallback(
    debounce((newTitle: string) => {
      onChange(newTitle || 'Untitled Document');
    }, 300), // Adjust the debounce delay as needed
    []
  );

  const handleInput = (e: React.FormEvent<HTMLHeadingElement>) => {
    const newTitle = e.currentTarget.textContent;
    if (newTitle !== document.title) {
      debouncedOnChange(newTitle || 'Untitled Document');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents new line creation
      const newTitle = e.currentTarget.textContent;
      if (newTitle !== document.title) {
        debouncedOnChange(newTitle || 'Untitled Document');
      }
      e.currentTarget.blur();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
    const newTitle = e.currentTarget.textContent;
    if (newTitle !== document.title) {
      debouncedOnChange(newTitle || 'Untitled Document');
    }
  };

  return (
    <h1
      contentEditable
      suppressContentEditableWarning
      className='text-4xl block font-bold text-foreground whitespace-pre-wrap break-words caret-foreground w-full outline-none ring-0 focus:ring-0 focus:outline-none'
      spellCheck
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      {document.title || 'Untitled Document'}
    </h1>
  );
};
