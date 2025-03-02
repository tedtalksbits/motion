'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Menu,
  Database,
  Users,
  Heading1,
  ListOrdered,
  Quote,
  Table2,
  Layout,
  FileText,
  CheckSquare,
  Slash,
} from 'lucide-react';

interface FloatingIconsProps
  extends React.ComponentPropsWithoutRef<typeof motion.div> {
  icons?: {
    icon: React.ElementType;
    color: string;
    textColor: string;
    position: string;
  }[];
}

const defaultIcons = [
  {
    icon: Database,
    color: 'bg-primary/20',
    textColor: 'text-primary/50',
    position: `right-[5%] top-[15%]`,
  },
  {
    icon: Users,
    color: 'bg-emerald-500/20',
    textColor: 'text-emerald-300',
    position: 'left-[20%] bottom-[15%]',
  },
  {
    icon: Table2,
    color: 'bg-blue-500/20',
    textColor: 'text-blue-300',
    position: 'right-[25%] bottom-[25%]',
  },
  {
    icon: Layout,
    color: 'bg-purple-500/20',
    textColor: 'text-purple-300',
    position: 'left-[30%] top-[20%]',
  },
  {
    icon: FileText,
    color: 'bg-orange-500/20',
    textColor: 'text-orange-300',
    position: 'right-[15%] bottom-[35%]',
  },
];
export const FloationgIcons = ({
  icons = defaultIcons,
  ...props
}: FloatingIconsProps) => {
  return (
    <div>
      {icons.map((item, index) => (
        <motion.div
          key={index}
          drag
          dragConstraints={{
            left: -50,
            right: 50,
            top: -50,
            bottom: 50,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute ${item.position} w-10 h-10 ${item.color} backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing`}
        >
          <item.icon className={`h-5 w-5 ${item.textColor}`} />
        </motion.div>
      ))}
    </div>
  );
};
