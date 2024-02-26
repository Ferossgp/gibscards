import {
  json,
  type LoaderFunctionArgs,
} from "@remix-run/cloudflare";

const key = "__my-key__";

export async function loader({ context }: LoaderFunctionArgs) {
  const { MY_KV } = context.cloudflare.env
  const value = await MY_KV.get(key);
  return json({ value });
}

export default function Index() {
  return (
    <div className="mx-auto grid w-full max-w-6xl min-h-screen pb-8">
      <div className="p-4 relative overflow-hidden rounded-3xl border-2 border-neutral-900 bg-[#f3f2fa] w-full h-full">
        <div className="absolute bottom-0 right-0 left-0 w-full z-0 opacity-30 transition-all duration-1000 ease-in-out flex justify-center items-center">
          <img src="/assets/friends.svg" alt="Buy gift card" className="w-1/3" />
        </div>
        <div className="flex flex-col gap-4 relative z-10">
          <h1 className="text-center text-3xl font-bold">Bro you are the best 💛</h1>
        </div>
      </div>
    </div>
  )
}