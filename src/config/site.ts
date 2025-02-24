import { HomeIcon, UserIcon, UserPlus } from 'lucide-react';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Auth Template',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    {
      label: 'Home',
      href: '/',
      icon: HomeIcon,
    },
    {
      label: 'Login',
      href: '/login',
      icon: UserIcon,
    },
    {
      label: 'Create Account',
      href: '/create-account',
      icon: UserPlus,
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
};
