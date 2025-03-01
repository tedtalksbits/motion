'use client';
import React from 'react';
import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { PlusCircle } from 'lucide-react';
import { useCreateDocument } from '@/features/documents/hooks/useDocuments';
import { useRouter } from 'next/navigation';

export const NavNewPage = () => {
  const router = useRouter();
  const { mutateAsync: createNewDocument } = useCreateDocument();

  async function handleCreateNewDocument() {
    const document = await createNewDocument({
      title: 'New Document',
      content: [],
    });
    console.log('New document created:', document);
    if (document) {
      router.push(`/documents/${document.id}`);
    }
  }
  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={handleCreateNewDocument}>
        <PlusCircle />
        <span>New Page</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
