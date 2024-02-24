import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

const VALUES = [10, 50, 100, 150]
export default function Index() {
  const [selected, setSelected] = useState<number | null>(null)
  return (
    <div className="mx-auto grid w-full max-w-6xl min-h-screen py-8">
      <div className="p-4 relative overflow-hidden rounded-3xl border-2 border-neutral-900 bg-[#f3f2fa] w-full h-full">
        <div className="absolute bottom-0 right-0 left-0 w-full z-0 opacity-30 transition-all duration-1000 ease-in-out flex justify-center items-center">
          <img src="/assets/friends.svg" alt="Buy gift card" className="w-1/3" />
        </div>
        <div className="flex flex-col gap-4 relative z-10">
          <h1 className="text-center text-3xl font-bold">Buy a Gift Card</h1>
          <Textarea placeholder="Leave a message..." />
          <div className="grid grid-cols-2 items-ceter px-4">
            <div className="flex gap-4 items-center">
              {VALUES.map((value) => (
                <Button
                  key={value}
                  size="sm"
                  variant="secondary"
                  selected={selected === value}
                  onClick={() => setSelected(value)}
                >
                  ${value}
                </Button>
              ))}
            </div>
            <Button>Buy Gibscard</Button>
          </div>
        </div>

      </div>
    </div>
  )
}