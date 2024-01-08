import type { NextPage } from 'next';
import Head from 'next/head';
import Dyanmic from "next/dynamic"

import BasicFlow from '@/components/Flow/BasicNode';


const Home: NextPage = () => {
  return (
    <div className="h-full flex flex-col">
      <BasicFlow />
    </div>
  );
};

export default Home;