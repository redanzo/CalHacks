"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { ExternalLink } from "lucide-react";
import Speech from "./Speech";

export default function ProfilePopover() {
  const { isConnected, logout, redirectToAuthUrl, emailAddress, address } =
    useCustomWallet();

  if (isConnected) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', top: '45px', right: '45px', width: 'max-content', zIndex: 100 }}>
            <Button className="hidden sm:block woopie" variant={"secondary"} style={{
              fontSize: '1.2em', textTransform: 'uppercase', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)',
              zIndex: '400',
              boxShadow: '3px 3px 20px 3px rgba(0, 0, 0, 0.5)',
              outline: '3px solid rgba(255, 255, 255, 0.7)',
            }}>
              Currently Logged in as <span style={{ color: '#0058B2', marginLeft: '5px' }}>{emailAddress}</span>
            </Button>
            <Avatar className="block sm:hidden">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </PopoverTrigger>
        <PopoverContent style={{
          background: 'rgba(255, 255, 255, 0.5)', color: '#fefefe', border: 'none',
          marginTop: '10px',
          boxShadow: '3px 3px 20px 3px rgba(0, 0, 0, 0.5)',
          outline: '3px solid rgba(255, 255, 255, 1)',
          backdropFilter: 'blur(10px)',
        }}>
          <Card className="border-none shadow-none" style={{ background: 'transparent', color: '#fefefe' }}>
            {/* <Button variant={'ghost'} size='icon' className="relative top-0 right-0" onClick={getAccountInfo}><RefreshCw width={16} /></Button> */}
            <CardHeader>
              <CardTitle className="woopie">ACCOUNT INFO</CardTitle>
            </CardHeader>
            <CardContent>
              <>
                <div className="flex flex-row gap-1 items-center t" style={{ display: 'flex', color: '#2c2e36' }}>
                  <span style={{ marginRight: '5px' }}>Address: </span>
                  <div className="flex flex-row gap-1">
                    <span>{`${address?.slice(0, 5)}...${address?.slice(
                      63
                    )}`}</span>
                    <a
                      href={`https://suiscan.xyz/testnet/account/${address}`}
                      target="_blank"
                    >
                      <ExternalLink width={12} />
                    </a>
                  </div>
                </div>
              </>
            </CardContent>
            <CardFooter className="flex flex-row gap-2 items-center justify-between">
              <Button
                variant={"destructive"}
                className="w-full text-center woopie"
                onClick={logout}
                style={{ background: '#f04747', color: '#fefefe', fontStyle: 'italic', width: '100%', fontSize: '1.2rem' }}
              >
                LOGOUT
              </Button>
            </CardFooter>
          </Card>
        </PopoverContent>
        <Speech />
      </Popover>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed' }}>
      <main style={{
        background: 'rgba(255, 255, 255, 0.3)',
        WebkitBackdropFilter: 'blur(10px)',
        color: '#fefefe',
        width: '70vw',
        height: '70vh',
        borderRadius: '10px',
        boxShadow: '7px 7px 20px 10px rgba(0, 0, 0, 0.5)',
        outline: '3px solid rgba(255, 255, 255, 1)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Button style={{
          background: 'rgba(255, 255, 255, 0.0)', fontSize: '1.5rem', padding: '20px 20px', borderRadius: '5px',
          boxShadow: '3px 3px 20px 3px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          outline: '3px solid rgba(255, 255, 255, 1)', color: '#2c2e36'
        }}
          className="woopie google"
          onClick={() => {
            redirectToAuthUrl();
          }}
        >
          SIGN IN WITH GOOGLE
        </Button>
      </main>
    </div>
  );
}
