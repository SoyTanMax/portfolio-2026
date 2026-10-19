import { cssBundleHref } from "@remix-run/css-bundle";
import stylesheet from "~/tailwind.css";
import globalStylesUrl from "~/styles/global.css";
import type { LinksFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: globalStylesUrl },
];

export default function App() {
  const links = [
    { id: 0, to: "/", label: "Home" },
    { id: 1, to: "https://github.com/SoyTanMax", label: "Github" },
    { id: 2, to: "https://www.linkedin.com/in/max-lopez-dev/", label: "LinkedIn" },
  ];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar links={links} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
