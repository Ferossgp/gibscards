import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { useToast } from "./components/toaster";
import { Toaster } from "./components/ui/sonner";
import './globals.css';
import { combineHeaders } from "./utils/headers";
import { getToast } from "./utils/toast.server";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { toast, headers: toastHeaders } = await getToast(request, context.env)

  return json({
    toast,
    ENV: {
    },
  }, {
    headers: combineHeaders(toastHeaders),
  })
}

export default function App() {
  const data = useLoaderData<typeof loader>()
  useToast(data.toast)

  return (
    <Document env={data.ENV}>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <Toaster closeButton position="top-right" />
    </Document>
  );
}

function Document({
  children,
  env = {},
}: {
  children: React.ReactNode
  env?: Record<string, string>
}) {
  return (
    <html lang="en" className='h-full overflow-x-hidden'>
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}