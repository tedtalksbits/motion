import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import React, { useState } from 'react';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  classname?: string;
}
const PasswordInput = ({ classname, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='relative'>
      <Input
        className={cn('', classname)}
        {...props}
        type={showPassword ? 'text' : 'password'}
      />
      <Label
        className='password-toggle absolute right-0 top-0 bottom-0 flex items-center justify-center w-10 h-10 cursor-pointer text-foreground/50 z-50'
        htmlFor='password-toggle'
        aria-label='Show password as plain text. Warning: this will display your password on the screen.'
      >
        {showPassword ? (
          <EyeClosedIcon onClick={() => setShowPassword(!showPassword)} />
        ) : (
          <EyeIcon onClick={() => setShowPassword(!showPassword)} />
        )}
      </Label>
    </div>
  );
};

export { PasswordInput };
