import { signInAction } from '@/features/user/server/actions';

import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default async function Login(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  return (
    <form className='min-w-96 mx-auto border p-4 rounded-lg'>
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
      <small className='text-red-500'>{JSON.stringify(searchParams)}</small>
    </form>
  );
}
