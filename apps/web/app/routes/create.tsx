import { createToastHeaders } from "~/utils/toast.server";
import {
  json,
  type ActionFunctionArgs,
} from "@remix-run/cloudflare";
import { nanoid } from "nanoid";
import { ClientOnly } from "remix-utils/client-only";
import CreateView from "~/components/create.client";

export async function action({ request, context }: ActionFunctionArgs) {
  const { MY_KV } = context.cloudflare.env

  const uniqueId = nanoid();

  if (request.method === "POST") {
    const formData = await request.formData();
    const message = formData.get("message") as string;
    const value = formData.get("value") as string;

    await MY_KV.put(uniqueId, JSON.stringify({ message, value }));

    return json(
      { success: true, cardId: uniqueId },
      {
        headers: await createToastHeaders({
          description: "Your gift card has been issued successfully! 🎉",
          type: "success",
        }, context.cloudflare.env),
      }
    );
  }

  throw new Error(`Method not supported: "${request.method}"`);
}

export default function Index() {

  return (
    <div className="mx-auto grid w-full max-w-6xl min-h-[90vh] pb-8">
      <div className="p-4 relative overflow-hidden rounded-3xl border-2 border-neutral-900 bg-[#f3f2fa] w-full h-full">
        <div className="absolute bottom-0 right-0 left-0 w-full z-0 opacity-30 transition-all duration-1000 ease-in-out flex justify-center items-center">
          <img
            src="/assets/friends.svg"
            alt="Buy gift card"
            className="w-1/3"
          />
        </div>
        <ClientOnly>
          {() => (<CreateView />)}
        </ClientOnly>
      </div>
    </div>
  )
}