'use client';

import React, { ReactNode } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { cn } from '@/lib/utils';

type TBreadCrumbProps = {
  homeElement: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const NextBreadcrumb = ({
  homeElement,
  containerClasses,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  return (
    <BreadcrumbList className={containerClasses}>
      <BreadcrumbItem className='hidden md:block'>
        <Link className='transition-colors hover:text-foreground' href={'/'}>
          {homeElement}
        </Link>
      </BreadcrumbItem>
      {pathNames.length > 0 && (
        <BreadcrumbSeparator className='hidden md:block' />
      )}
      {pathNames.map((link, index) => {
        let href = `/${pathNames.slice(0, index + 1).join('/')}`;
        return (
          <React.Fragment key={index}>
            <BreadcrumbItem
              className={cn('hidden md:flex capitalize', {
                'text-muted-foreground': paths === href,
              })}
            >
              <Link
                href={href}
                className='truncate max-w-[16ch] transition-colors hover:text-foreground'
              >
                {link}
              </Link>
            </BreadcrumbItem>
            {pathNames.length !== index + 1 && (
              <BreadcrumbSeparator className='hidden md:block' />
            )}
          </React.Fragment>
        );
      })}
    </BreadcrumbList>
  );
};

export default NextBreadcrumb;
