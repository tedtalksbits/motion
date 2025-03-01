'use client';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Search, Trash, Undo } from 'lucide-react';
import { Input } from './ui/input';
import { ConfirmModal } from './ui/confirm-dialog';
import {
  useDeleteDocument,
  useGetArchivedDocuments,
  useRestoreDocument,
} from '@/features/documents/hooks/useDocuments';
import { useRouter } from 'next/navigation';

export const NavTrash = () => {
  const { data: documents, isLoading } = useGetArchivedDocuments();
  const { mutateAsync: restoreDocument } = useRestoreDocument();
  const { mutateAsync: deleteDocument } = useDeleteDocument();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { isMobile } = useSidebar();

  const handleRestoreDocument = async (documentId: string) => {
    const confirm = window.confirm(
      'Are you sure you want to restore this document?'
    );
    if (!confirm) return;
    await restoreDocument(documentId);

    router.push(`/documents/${documentId}`);
  };
  const handleDeleteDocument = async (documentId: string) => {
    const res = await deleteDocument(documentId);
    console.log('res', res);
  };

  const filteredDocuments = documents?.filter((document) =>
    document.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
            <Trash />
            Trash
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
          side={isMobile ? 'bottom' : 'right'}
          align='end'
          sideOffset={4}
        >
          <DropdownMenuLabel className='p-0 font-normal'>
            <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
              <Search
                className='size-5 text-muted-foreground'
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
              <Input
                type='text'
                placeholder='Search...'
                autoFocus
                className='w-full bg-accent p-2 h-8'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={isLoading || documents?.length === 0}
              />
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {isLoading ? (
              <DropdownMenuItem className='cursor-not-allowed'>
                Loading...
              </DropdownMenuItem>
            ) : filteredDocuments?.length === 0 ? (
              <DropdownMenuItem className='cursor-not-allowed'>
                No documents found
              </DropdownMenuItem>
            ) : (
              filteredDocuments?.map((document) => (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className='cursor-pointer'
                  key={document.id}
                >
                  <div className='flex items-center justify-between w-full'>
                    <div>{document.title}</div>
                    <div className='actions flex items-center gap-3'>
                      <button
                        className='hover:bg-foreground/10 rounded-sm p-1'
                        onClick={() => handleRestoreDocument(document.id)}
                      >
                        <Undo className='size-5 ' />
                      </button>
                      <ConfirmModal
                        title='Are you sure?'
                        description='This action cannot be undone. This will permanently delete your account and remove your data from our servers.'
                        onConfirm={async () => {
                          await handleDeleteDocument(document.id);
                        }}
                      >
                        <button className='hover:bg-destructive/20 rounded-sm p-1'>
                          <Trash className='size-5' />
                        </button>
                      </ConfirmModal>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};
