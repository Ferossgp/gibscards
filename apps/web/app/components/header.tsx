import { DynamicConnectButton, useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core"
import { Button } from "./ui/button";

export const Header: React.FC = () => {
  const isLoggedIn = useIsLoggedIn();

  const { handleLogOut, primaryWallet } = useDynamicContext();

  return (
    <div className="max-w-6xl pt-4 mx-auto flex justify-end px-6 z-10 relative">
      {isLoggedIn ? (
        <div className="flex py-2 gap-4 items-center justify-between flex-1">
          <p>Welcome: {primaryWallet?.address}</p>
          <Button onClick={handleLogOut} variant="outline">Log Out</Button>
        </div>
      ) : (
        <DynamicConnectButton>
          <Button variant="outline" asChild>
            <div>
              Sign in
            </div>
          </Button>
        </DynamicConnectButton>
      )}
    </div>
  )
}
