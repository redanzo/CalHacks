"use client";

import styles from "./header.module.css"
import { useEffect, useState } from "react";
import { useCustomWallet } from "@/contexts/CustomWallet";
// import ProfilePopover from "@/components/ProfilePopover";
import { CreateCounter } from "@/components/CreateCounter";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { Counter } from "@/components/Counter";
import clientConfig from "@/config/clientConfig";
import dynamic from 'next/dynamic';

const ProfilePopover = dynamic(() => import('@/components/ProfilePopover'), { ssr: false });

export default function Page() {
  const { isConnected } = useCustomWallet();
  const [counterId, setCounter] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (isValidSuiObjectId(hash)) {
      setCounter(hash);
    }
  }, []);

  return (
    <div className="w-full h-full min-h-screen">
      <div>
        <h1 className={styles.logo}>
          <div>
            <span data-after="reelancer">F</span>
            <span data-after="inking">L</span>
            <span data-after="xpertise">E</span>
            <span data-after="change">X</span>
          </div>
        </h1>
      </div>
      <ProfilePopover />
      <div className="w-full flex flex-col items-center gap-4 p-4">
        {/* <Counter id={clientConfig.GLOBAL_COUNTER_ID} />
        {
          counterId ? (
            <Counter id={counterId} />
          ) : (
            <CreateCounter
              onCreated={(id) => {
                window.location.hash = id;
                setCounter(id);
              }}
            />
          )
        } */}
      </div>
    </div >
  );
}
