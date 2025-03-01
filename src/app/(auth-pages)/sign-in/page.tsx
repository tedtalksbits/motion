import { signInAction } from '@/features/user/server/actions';

import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { FloationgIcons } from '@/components/floating-icons';
export default async function Login(props: { searchParams: Promise<any> }) {
  const serverResponse = (await props.searchParams) as {
    error?: string;
    message?: string;
  };

  return (
    <div className='pt-24'>
      <div className='absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent' />
      <form className='max-w-96 mx-auto p-4 bg-card/40 backdrop-blur-xl rounded-2xl border border-border shadow-2xl'>
        <h1 className='text-2xl font-medium'>Sign in</h1>
        <p className='text-sm text-foreground'>
          Don't have an account?{' '}
          <Link className='text-primary font-medium underline' href='/sign-up'>
            Sign up
          </Link>
        </p>
        <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
          <Label htmlFor='email'>Email</Label>
          <Input name='email' placeholder='you@example.com' required />
          <div className='flex justify-between items-center'>
            <Label htmlFor='password'>Password</Label>
            <Link
              className='text-xs text-foreground underline'
              href='/forgot-password'
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type='password'
            name='password'
            placeholder='Your password'
            required
          />
          <SubmitButton pendingText='Signing In...' formAction={signInAction}>
            Sign in
          </SubmitButton>
        </div>
      </form>
      {serverResponse.error ? (
        <p className='text-sm mt-4 border border-rose-500 p-4 rounded-md max-w-96 mx-auto bg-red-500/70 text-white'>
          {serverResponse.error}
        </p>
      ) : null}

      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none' />
      <FloationgIcons />
    </div>
  );
}
