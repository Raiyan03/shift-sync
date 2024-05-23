"use client"
import { useAuth } from '@/app/components/Auth-Context';
import Layout from '@/app/pages/Employee/layout';
import { useRouter } from 'next/navigation';
import Data from './data';

const Info = () => {

  const { userLoggedIn } = useAuth();
  const { push } = useRouter();

    return <div className="text-black">{userLoggedIn ? <Data /> : push("/")}</div>;

};

export default Info;
