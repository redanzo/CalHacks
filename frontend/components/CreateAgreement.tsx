import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useCreateAgreementTransaction } from "@/hooks/useCreateAgreementTransaction";
import { useCustomWallet } from "@/contexts/CustomWallet";

export function CreateAgreement({
  onCreated,
}: {
  onCreated: (id: string) => void;
}) {
  const [waitingForTxn, setWaitingForTxn] = useState(false);
  const { isConnected } = useCustomWallet();

  const { handleExecute } = useCreateAgreementTransaction();

  async function create() {
    setWaitingForTxn(true);
    console.log("create agreement");
    const txn = await handleExecute();

    console.log("txn", txn);

    const objectId = txn.effects?.created?.[0]?.reference?.objectId;

    if (objectId) {
      onCreated(objectId);
    }

    setWaitingForTxn(false);
  }

  return (
    <Card>
      <Button
        onClick={() => {
          console.log("create agreement");
          create();
        }}
        disabled={waitingForTxn || !isConnected}
      >
        {waitingForTxn ? <ClipLoader size={20} /> : isConnected ? "Create" : "connect wallet"}
      </Button>
    </Card>
  );
}
