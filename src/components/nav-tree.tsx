import {
  ChevronRight,
  Edit,
  File,
  FileText,
  MoreHorizontal,
  Plus,
  Star,
  Text,
  Trash,
} from 'lucide-react';
import { CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from './ui/sidebar';
import { Collapsible } from '@radix-ui/react-collapsible';
import { MotionDocument } from '@/features/documents/types/document';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format, formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  useArchiveDocument,
  useCreateDocument,
  useUpdateDocument,
} from '@/features/documents/hooks/useDocuments';

export function Tree({ doc }: { doc: MotionDocument }) {
  const router = useRouter();
  if (!doc?.children?.length) {
    return (
      <SidebarMenuButton
        onClick={() => {
          router.push(`/documents/${doc.id}`);
        }}
        isActive={false}
        className='data-[active=true]:bg-transparent group/menu-button'
      >
        <File />
        <TreeTitle>{doc.title}</TreeTitle>
        {/* when hover show action buttons */}
        <TreeActions>
          <TreeActionItem
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DocumentDropdown document={doc} />
          </TreeActionItem>
          <TreeActionItem>
            <Plus className='size-4' />
          </TreeActionItem>
        </TreeActions>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className='group/collapsible [&[data-state=open]>button>div>svg:first-child]:rotate-90'
        defaultOpen={false}
      >
        <SidebarMenuButton
          className='group/menu-button'
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/documents/${doc.id}`);
          }}
        >
          <CollapsibleTrigger
            asChild
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <TreeActionItem>
              <ChevronRight className='size-4' />
            </TreeActionItem>
          </CollapsibleTrigger>
          <FileText />
          <TreeTitle>{doc.title}</TreeTitle>
          <TreeActions>
            <TreeActionItem
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <DocumentDropdown document={doc} />
            </TreeActionItem>
            <TreeActionItem>
              <Plus className='size-4' />
            </TreeActionItem>
          </TreeActions>
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub>
            {doc?.children?.map((child) => (
              <Tree key={child.id} doc={child} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

interface TreeTitleProps extends React.HTMLAttributes<HTMLSpanElement> {}

function TreeTitle({ className, ...props }: TreeTitleProps) {
  return (
    <span
      className={cn('text-xs font-normal leading-tight truncate', className)}
      {...props}
    />
  );
}

interface TreeActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

function TreeActions({ className, ...props }: TreeActionsProps) {
  return (
    <div
      className={cn(
        'actions flex items-center gap-1 ml-auto opacity-0 group-hover/menu-button:opacity-100 transition-all ease-in-out duration-300',
        className
      )}
      {...props}
    />
  );
}

interface TreeActionItemProps extends React.HTMLAttributes<HTMLDivElement> {}

function TreeActionItem({ className, ...props }: TreeActionItemProps) {
  return (
    <div
      className={cn(
        'opacity-0 p-[2px] bg-foreground/10 group group-hover/menu-button:opacity-100 transition-all ease-in-out duration-300 rounded-sm',
        className
      )}
      {...props}
    />
  );
}

function DocumentDropdown({ document }: { document: MotionDocument }) {
  const { isMobile } = useSidebar();
  const { mutateAsync: trashDocument, isPending: isTrashPending } =
    useArchiveDocument();
  const { mutateAsync: duplicateDocument, isPending: isDuplicatePending } =
    useCreateDocument();
  const { mutateAsync: updateDocument, isPending: isUpdateDocumentPending } =
    useUpdateDocument();
  const handleRename = async () => {
    // Implement rename logic here
    const newTitle = prompt('Enter new title', document.title);
    if (newTitle) {
      await updateDocument({
        id: document.id,
        title: newTitle,
      });
    }
  };
  const handleTrashDocument = async () => {
    await trashDocument(document.id);
  };
  const handleDuplicate = async () => {
    await duplicateDocument({
      title: document.title,
      content: document.content,
    });
  };

  const handleAddToFavorites = async () => {
    await updateDocument({
      id: document.id,
      is_favorite: !document.is_favorite,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreHorizontal className='size-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
        side={isMobile ? 'bottom' : 'right'}
        align='end'
        sideOffset={4}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold max-w-[20ch] mb-1'>
                {document.title}
              </span>
              <div className='flex items-center justify-between'>
                <span className='truncate text-foreground/50 text-xs max-w-[12ch]'>
                  {document.id}
                </span>
                <span className='truncate text-foreground/50 text-[.65rem] w-fit'>
                  {formatDistanceToNow(new Date(document.created_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleAddToFavorites}
            disabled={isUpdateDocumentPending}
          >
            <Star />
            Add to Favorites
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleDuplicate}
            disabled={isDuplicatePending}
          >
            <File />
            Duplicate
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleRename}
            disabled={isUpdateDocumentPending}
          >
            <Edit />
            Rename
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleTrashDocument}
          disabled={isTrashPending}
        >
          <Trash />
          Move to Trash
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
