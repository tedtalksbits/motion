import { signUpAction } from '@/features/user/server/actions';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default async function Signup(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  if ('message' in searchParams) {
    return (
      <div className='flex items-center justify-center gap-2 p-4'>
        <h1 className='text-2xl font-medium'>{searchParams.message}</h1>
        <p className='text-sm text-foreground'>
          Already have an account?{' '}
          <Link className='text-primary font-medium underline' href='/sign-in'>
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <form className='min-w-96 mx-auto border p-4 rounded-lg'>
        <h1 className='text-2xl font-medium'>Sign up</h1>
        <p className='text-sm text text-foreground'>
          Already have an account?{' '}
          <Link className='text-primary font-medium underline' href='/sign-in'>
            Sign in
          </Link>
        </p>
        <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
          <Label htmlFor='email'>Email</Label>
          <Input name='email' placeholder='you@example.com' required />
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            name='password'
            placeholder='Your password'
            minLength={6}
            required
          />
          {/* server action: see sing in for client action */}
          <SubmitButton formAction={signUpAction} pendingText='Signing up...'>
            Sign up
          </SubmitButton>
        </div>
        <small className='text-red-500'>{JSON.stringify(searchParams)}</small>
      </form>
    </>
  );
}
