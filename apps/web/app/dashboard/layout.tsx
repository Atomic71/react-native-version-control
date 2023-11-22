import type { Metadata } from 'next';
import UserNav from '../../src/components/user-nav';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User dashboard',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <UserNav />
      <main className='max-w-80'>{children}</main>
    </>
  );
}
