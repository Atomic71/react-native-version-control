import Link from 'next/link';
import { type ReactElement } from 'react';
import { cookies } from 'next/headers';
import { makeServerClient } from '../db/supabase';

async function UserNav(): Promise<ReactElement> {
  const client = makeServerClient(cookies());
  const {
    data: { user },
  } = await client.auth.getUser();
  return (
    <nav className='px-10 py-4 justify-between flex bg-teal-300 text-gray-800'>
      <h3>React Native Version Control</h3>
      <div className='flex items-center gap-2'>
        <p>{user?.email}</p>|<Link href='/auth/signout'>Logout</Link>
      </div>
    </nav>
  );
}

export default UserNav;
