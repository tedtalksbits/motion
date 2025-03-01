import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { Input } from './ui/input';
export const NavSearch = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Search />
            <span>Search</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className='hidden'>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div>
          <Input type='text' placeholder='Search...' autoFocus />
        </div>
      </DialogContent>
    </Dialog>
  );
};
