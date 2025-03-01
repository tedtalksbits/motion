import { signUpAction } from '@/features/user/server/actions';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { FloationgIcons } from '@/components/floating-icons';

export default async function Signup(props: { searchParams: Promise<any> }) {
  const serverResponse = await props.searchParams;
  if ('message' in serverResponse) {
    return (
      <div className='flex items-center justify-center gap-2 p-4'>
        <h1 className='text-2xl font-medium'>{serverResponse.message}</h1>
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
    <div className='pt-24'>
      <div className='absolute inset-0 bg-gradient-to-b from-violet-400/10 via-transparent to-transparent' />
      <form className='max-w-96 mx-auto p-4 bg-card/40 backdrop-blur-xl rounded-2xl border border-border shadow-2xl'>
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
      </form>
      {serverResponse.error ? (
        <p className='text-sm mt-4 border border-rose-500 p-4 rounded-md max-w-96 mx-auto bg-red-500/70 text-white'>
          {serverResponse.error}
        </p>
      ) : null}

      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400/10 via-transparent to-transparent pointer-events-none' />
      <FloationgIcons />
    </div>
  );
}
