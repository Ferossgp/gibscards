import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function Index() {
  return (
    <div className="mx-auto grid w-full max-w-6xl min-h-[90vh] pb-8">
      <div className="p-4 overflow-hidden relative rounded-3xl border-2 border-neutral-900 bg-[#f3f2fa] grid grid-cols-2 gap-x-6 w-full h-full">
        <div className="group animate-in ease-in-out slide-in-from-left-24 fade-in-75 duration-500 relative border-2 rounded-2xl border-neutral-900 overflow-hidden bg-[#6b66da]">
          <div className="absolute bottom-0 left-0 -z-0 opacity-30 w-2/3 transition-all duration-1000 ease-in-out -translate-x-44 translate-y-16 scale-90 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:scale-100">
            <img src="/assets/buying.svg" alt="Buy gift card" className="w-full h-full" />
          </div>
          <div className="grid grid-rows-3 gap-6 px-4 py-8 h-full z-10">
            <div className="row-span-2 flex flex-col gap-4">
              <h1 className="text-5xl font-bold text-primary-foreground">Gift the ability to transact.</h1>
              <h3 className="text-xl text-[#dedeeb]">Invite the next billion in web3. Onboard your friends and family with a gift.</h3>
            </div>
            <div>
              <Button asChild>
                <Link to="/create">
                  Buy a Gibscard
                </Link>
              </Button>
            </div>
          </div>

        </div>
        <div className="relative group">
          <div className="absolute bottom-0 right-0 -z-0 opacity-30 w-1/3 transition-all duration-1000 ease-in-out translate-x-16 translate-y-16 scale-90 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:scale-100">
            <img src="/assets/enter.svg" alt="Buy gift card" className="w-full h-full" />
          </div>
          <div className="grid grid-rows-3 gap-6 px-4 py-8 h-full z-10">
            <div className="row-span-2 flex flex-col gap-4">
              <h2 className="text-[#6b66da] text-4xl font-bold">Got a gibscard?</h2>
              <h3 className="text-xl">Open the new world of transaction now!</h3>
            </div>
            <div>
              <Link to="/claim">
                <Button variant="secondary">Use your Gibscard</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
