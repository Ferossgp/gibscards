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
    <ClientOnly>
      {() => (<CreateView />)}
    </ClientOnly>
  )
}