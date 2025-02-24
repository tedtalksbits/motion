'use client';
import { Button } from '@/components/ui/button';
import { useGetUser, useSignOutUser } from '@/features/user/hooks/useUser';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { data: user, isLoading } = useGetUser();
  const { mutateAsync: handleLogout, isPending } = useSignOutUser();
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className='container mx-auto'>
      <div className=''>
        <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>

        <div className='space-y-4'>
          <p>Welcome, {user?.email}!</p>

          <form>
            <Button
              type='submit'
              className='w-full'
              disabled={isPending}
              onClick={async (e) => {
                e.preventDefault();
                await handleLogout();
                router.push('/sign-in');
              }}
            >
              Logout
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
