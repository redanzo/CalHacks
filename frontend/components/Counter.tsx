import { useSuiClient, useSuiClientQuery } from "@mysten/dapp-kit";
import type { SuiObjectData } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useClaimTransaction } from "@/hooks/useClaimTransaction";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { set } from "zod";

let freelancer ="wfbnebnrgfoi"

export function Counter({ id, setObjectID, }: { id: string, setObjectID:any }) {
  setObjectID(id)
  const { address, isConnected } = useCustomWallet();
  const suiClient = useSuiClient();
  const { data, isPending, error, refetch } = useSuiClientQuery("getObject", {
    id,
    options: {
      showContent: true,
      showOwner: true,
    },
  });

  // refetch the data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [waitingForTxn, setWaitingForTxn] = useState("");



  if (isPending) return <span>Loading...</span>;

  if (error) return <span>Error: {error.message}</span>;

  if (!data.data) return <span>Not found</span>;

  const obj = data.data?.content?.fields;
  const balance = obj.balance;
  const rercuiter = obj.recruiter;
  freelancer = obj.freelancer;
  const status = obj.status ? "Complete" : "Incomplete";
  console.log(balance, freelancer, rercuiter, status);
  console.log(data.data?.content?.fields);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Object ID {id}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <span>Balance: {balance}</span>
        <span>Freelancer: {freelancer}</span>
        <span>Rercuiter: {rercuiter}</span>
        <span>status: {status}</span>
       
      </CardContent>
    </Card>
  );
}

