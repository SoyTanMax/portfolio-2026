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
  // Preload the two faces every page renders first, so text doesn't flash in a fallback font.
  { rel: "preload", href: "/fonts/Geist/Geist-Variable.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "preload", href: "/fonts/ClashDisplay/ClashDisplay-Semibold.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
];

export default function App() {
  const links = [
    { id: 0, to: "/", label: "Work" },
    { id: 1, to: "https://www.linkedin.com/in/max-lopez-dev/", label: "LinkedIn" },
    { id: 2, to: "https://github.com/SoyTanMax", label: "GitHub" },
    { id: 3, to: "mailto:max.lopez.dev@gmail.com", label: "Email" },
  ];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      {/* Dark base so no white shows through while mobile browsers paint during scroll. */}
      <body className="bg-[#07080B]">
        {/* First stop for keyboard users: jump past the navigation. Hidden until focused. */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-[#07080B]"
        >
          Skip to content
        </a>
        <Navbar links={links} />
        <div id="content" tabIndex={-1} className="outline-none">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
