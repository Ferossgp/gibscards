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
import { Web3Provider } from "./context/Web3Provider";
import { Header } from "./components/header";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { toast, headers: toastHeaders } = await getToast(request, context.cloudflare.env)

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
      <Web3Provider>
        <Header />
        <Outlet />
      </Web3Provider>
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
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