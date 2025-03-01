import { DocumentViewer } from '@/features/documents/components/document';
import React from 'react';

export default async function DocumentPage({
  params,
  searchParams,
}: {
  params: Promise<{ documentid: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  return <DocumentViewer id={resolvedParams.documentid} />;
}
