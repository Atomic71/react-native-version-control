'use client';
import Link from 'next/link';
import { type ReactElement } from 'react';

function UserNav(): ReactElement {
  return (
    <nav className='px-10 py-4 justify-between flex bg-teal-300 text-gray-800'>
      <h3>React Native Version Control</h3>
      <Link href='/auth/signout'>Logout</Link>
    </nav>
  );
}

export default UserNav;
