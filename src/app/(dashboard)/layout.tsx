import { AppSidebar } from '@/components/app-sidebar';
import NextBreadcrumb from '@/components/nav-breadcrumbs';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import '../globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />

          <NextBreadcrumb
            homeElement={'Home'}
            activeClasses='underline'
            containerClasses='flex py-5'
            listClasses='hover:underline mx-2 font-bold'
            capitalizeLinks
          />
        </header>
        <div className='wrapper'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
