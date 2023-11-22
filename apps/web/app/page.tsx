import UserAuth from '../src/components/user-auth';

export default function Page(): JSX.Element {
  return (
    <main className='px-4 py-3'>
      <section className='max-w-sm mx-auto'>
        <h3 className='text-xl text-center'>React Native Version Control</h3>
        <UserAuth />
      </section>
    </main>
  );
}
