"use client"
import { useAuth } from '@/app/components/Auth-Context';
import Layout from '@/app/pages/Employee/layout';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

const Schedule = () => {
  const { userLoggedIn } = useAuth();
  const { push } = useRouter();
  return (

    <>
    {userLoggedIn
      ? <h1 className="text-2xl font-bold mb-4 text-black">Your Schedule</h1>
      : push('/') }
  </>

      
  );
};

export default Schedule;
