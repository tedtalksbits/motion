'use client';
import { useGetDocumentTree } from '@/features/documents/hooks/useDocuments';
import React from 'react';
import { Tree } from './nav-tree';

export const NavDocuments = () => {
  const { data: docTree, isLoading, isError } = useGetDocumentTree();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading documents</div>;
  return (
    <>
      {docTree?.map((doc) => (
        <Tree key={doc.id} doc={doc} />
      ))}
    </>
  );
};
