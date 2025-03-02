'use client';

import { useEffect, useState } from 'react';
import { DocumentTitle } from './document-title';
import { useGetDocument, useUpdateDocument } from '../hooks/useDocuments';

import { Block } from '@blocknote/core';
import { useDebounce } from '@uidotdev/usehooks';
import { DocumentHeader } from './document-header';
import { Editor } from '@/components/dynamic-editor';

export const DocumentViewer = ({ id }: { id: string }) => {
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  const { data: document, isLoading, isError } = useGetDocument(id);
  const { mutateAsync: updateDocument } = useUpdateDocument();
  const debouncedBlocks = useDebounce(blocks, 1000);

  useEffect(() => {
    if (debouncedBlocks) {
      updateDocument({ id, content: debouncedBlocks });
    }
  }, [debouncedBlocks, id, updateDocument]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading document</div>;
  if (!document) return <div>Document not found</div>;

  return (
    <>
      <DocumentHeader document={document} />
      <div className='px-8 pt-20 pb-8'>
        <DocumentTitle
          document={document}
          onChange={(title) => {
            updateDocument({ id, title });
          }}
        />
      </div>

      <Editor
        onChange={(value) => {
          console.log('Document changed:', value);
          setBlocks(value);
        }}
        initialContent={document.content}
        editable={true}
      />
    </>
  );
};
