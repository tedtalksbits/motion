import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { Cog } from 'lucide-react';
import { Label } from './ui/label';
import { ThemeSelect } from './theme-select';

export const NavSettings = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Cog />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <div className='hidden'>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-y-1'>
            <Label>Appearance</Label>
            <span className='text-[0.8rem] text-muted-foreground'>
              Customize how Motion looks on your device
            </span>
          </div>
          <ThemeSelect />
        </div>
      </DialogContent>
    </Dialog>
  );
};
