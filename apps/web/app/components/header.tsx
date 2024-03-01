import { DynamicConnectButton, useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core"
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export const Header: React.FC = () => {
  const isLoggedIn = useIsLoggedIn();
  const [loggedIn, setLoggedIn] = useState(false);

  const { handleLogOut, primaryWallet, ...data } = useDynamicContext();

  console.log(data, primaryWallet);

  useEffect(() => {
    if (isLoggedIn && !loggedIn) {
      primaryWallet?.connector.signMessage('Welcome!').catch((e) => {
        console.error(e);
      });
      setLoggedIn(true);

    }
  }, [isLoggedIn, loggedIn, primaryWallet?.connector]);

  return (
    <div className="max-w-6xl pt-4 mx-auto flex justify-end px-6">
      {isLoggedIn ? (
        <div className="flex py-2 gap-4 items-center justify-between flex-1">
          <p>Welcome: {primaryWallet?.address}</p>
          <Button onClick={handleLogOut} variant="outline">Log Out</Button>
        </div>
      ) : (
        <Button variant="outline" asChild>
          <DynamicConnectButton>
            Sign in
          </DynamicConnectButton>
        </Button>
      )}
    </div>
  )
}
