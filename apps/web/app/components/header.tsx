import { DynamicConnectButton, DynamicNav, DynamicUserProfile, useIsLoggedIn } from "@dynamic-labs/sdk-react-core"
import { Button } from "./ui/button";

export const Header: React.FC = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <div className="max-w-6xl pt-4 mx-auto flex justify-end px-6">
      {isLoggedIn ? (
        <div className="flex py-2 gap-4">
          <DynamicNav />
          <DynamicUserProfile />
        </div>
      ) : (
        <DynamicConnectButton>
          <Button variant="outline">Connect Wallet</Button>
        </DynamicConnectButton>
      )}
    </div>
  )
}
