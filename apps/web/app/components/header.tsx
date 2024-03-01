import {
  DynamicConnectButton,
  useDynamicContext,
  useIsLoggedIn,
} from "@dynamic-labs/sdk-react-core";
import { Button } from "./ui/button";
import { useActiveChain } from "~/context/Web3Provider.client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { allChains } from "~/constants";

export const Header: React.FC = () => {
  const isLoggedIn = useIsLoggedIn();
  const { chain, setChain } = useActiveChain();

  const { handleLogOut, primaryWallet } = useDynamicContext();

  return (
    <div className="max-w-6xl pt-4 mx-auto flex justify-end px-6 z-10 relative">
      {isLoggedIn ? (
        <div className="flex py-2 gap-4 items-center justify-between flex-1">
          <div className="flex gap-6 items-center">
            <p>Welcome: {primaryWallet?.address}</p>
            <Select value={chain} onValueChange={setChain}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {allChains.map((chain) => (
                  <SelectItem key={chain} value={chain}>{chain}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleLogOut} variant="outline">
            Log Out
          </Button>
        </div>
      ) : (
        <DynamicConnectButton>
          <Button variant="outline" asChild>
            <div>Sign in</div>
          </Button>
        </DynamicConnectButton>
      )}
    </div>
  );
};
