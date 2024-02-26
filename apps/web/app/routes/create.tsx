import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { createToastHeaders } from "~/utils/toast.server";
import {
  json,
  type ActionFunctionArgs,
} from "@remix-run/cloudflare";
import { useActionData, useSubmit } from "@remix-run/react";
import { useUserOperation } from "~/hooks/use-user-op";
import { nanoid } from "nanoid";

export async function action({ request, context }: ActionFunctionArgs) {
  const { MY_KV } = context.cloudflare.env

  const uniqueId = nanoid();

  if (request.method === "POST") {
    const formData = await request.formData();
    const value = formData.get("message") as string;
    await MY_KV.put(uniqueId, value);

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

const VALUES = [10, 50, 100, 150]
export default function Index() {
  const [message, setMessage] = useState<string>("")
  const [selected, setSelected] = useState<number | null>(null)
  const submit = useSubmit();
  const data = useActionData<typeof action>();
  const sendUserOperation = useUserOperation();

  const onSubmit = async () => {
    const data = await sendUserOperation([{
      data: '0x0',
      target: '0x0',
    }]);

    console.log(data);

    const formData = new FormData();
    formData.append("message", message);
    formData.append("hash", data?.hash || "");
    formData.append("value", selected?.toString() || "");

    submit(formData, { method: "post" });
  }

  if (data) {
    return (
      <div>Success {data.cardId}</div>
    )
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl min-h-screen pb-8">
      <div className="p-4 relative overflow-hidden rounded-3xl border-2 border-neutral-900 bg-[#f3f2fa] w-full h-full">
        <div className="absolute bottom-0 right-0 left-0 w-full z-0 opacity-30 transition-all duration-1000 ease-in-out flex justify-center items-center">
          <img src="/assets/friends.svg" alt="Buy gift card" className="w-1/3" />
        </div>
        <div className="flex flex-col gap-4 relative z-10">
          <h1 className="text-center text-3xl font-bold">Buy a Gift Card</h1>
          <Textarea
            placeholder="Leave a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="grid grid-cols-2 items-ceter px-4">
            <div className="flex gap-4 items-center">
              {VALUES.map((value) => (
                <Button
                  key={value}
                  size="sm"
                  variant={selected === value ? "default" : "secondary"}
                  selected={selected === value}
                  onClick={(e) => {
                    e.preventDefault()
                    setSelected(value)
                  }}
                >
                  ${value}
                </Button>
              ))}
            </div>
            <Button onClick={onSubmit}>Buy Gibscard</Button>
          </div>
        </div>
      </div>
    </div>
  )
}