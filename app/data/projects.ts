import type { Project } from "~/types/Project";

// Order matters: stories appear on the home page in this order.
// Archived projects are listed under "More work".
export const projects: Project[] = [
  {
    id: "fy25-design-system",
    title: "Epicor FY25 Design System",
    tagline: "Design system · 3-tier tokens · 42 components",
    story: {
      eyebrow: "Design system · Tokens + components",
      stage: "#D7E0E4",
      beats: [
        {
          label: "What it is",
          body: "The design system behind epicor.com: tokens with light and dark modes, and 42 components in Figma.",
          visual: { type: "image", src: "/home/fy25/cover.webp", alt: "The Epicor FY25 style guide cover" },
        },
        {
          label: "The problem",
          body: "The FY23 library had flat color styles named by hue and no variables. Every brand change meant manual replacement maps, page by page.",
          visual: { type: "image", src: "/home/fy25/01-fy23-color-styles.webp", alt: "FY23 color styles named by hue, with hex values typed as text" },
        },
        {
          label: "What I did",
          body: "Rebuilt it as three tiers of tokens: 168 primitives, 400 semantic and 520 component tokens. A brand change is made once and reaches every component.",
          visual: { type: "image", src: "/home/fy25/04-variable-collections.webp", alt: "The three FY25 variable collections with their counts" },
        },
        {
          label: "Components",
          body: "Rebuilt the 42 components already on epicor.com on those tokens: 1,124 variants, with about 95% of their colors bound to variables.",
          visual: { type: "image", src: "/case-studies/fy25/10-components.webp", alt: "A sample of FY25 components in their default state", tight: true },
        },
        {
          label: "Result",
          body: "The marketing and dev teams build CMS pages with FY25. Epicor.com runs on it, apart from custom pages.",
          visual: { type: "image", src: "/home/fy25/05-light-dark.webp", alt: "FY25 components in light and dark mode" },
        },
      ],
    },
  },
  {
    id: "pos-redesign",
    title: "Pide Directo POS",
    tagline: "Internal tool for restaurant staff · Two redesigns · Design + React",
    story: {
      eyebrow: "Internal tool · Design + React",
      stage: "#DCF2E9",
      beats: [
        {
          label: "What it is",
          body: "The point of sale restaurant staff use to take orders and charge customers, on tablet, phone and desktop.",
          visual: { type: "image", src: "/home/pos/1-orders.webp", alt: "Pide Directo POS start screen with order types and pending orders" },
        },
        {
          label: "The problem",
          body: "The main action on each screen wasn't the most visible thing. To start an order, staff faced a giant box that only said “Select the order type”.",
          visual: { type: "image", src: "/home/pos/2-before.webp", alt: "The old order type screen, with a large empty box and small buttons to the side" },
        },
        {
          label: "What I did",
          body: "Redesigned the order flow and built it in React in two weeks. Then a second version: a checkout with saved orders, tips, discounts, credits and more payment methods.",
          visual: { type: "image", src: "/home/pos/3-pay.webp", alt: "The redesigned checkout on tablet, with payment methods, keypad and order summary" },
        },
        {
          label: "Result",
          body: "Both versions shipped. Version 1 went to every business using Pide Directo.",
          visual: { type: "image", src: "/home/pos/4-phones.webp", alt: "Four phone screens of the checkout: payment method, amount, customer details and summary", tight: true },
        },
      ],
    },
  },
  {
    id: "web-menu-redesign",
    title: "Pide Directo Web Menu",
    tagline: "Ordering funnel · Phone-only sign-up · Led design + React build",
    story: {
      eyebrow: "Ordering funnel · Led design + React",
      stage: "#F1DCDA",
      beats: [
        {
          label: "What it is",
          body: "The web menu where restaurant customers order directly, without an app.",
          visual: { type: "image", src: "/home/web-menu/1-menu.webp", alt: "Three phone screens of the web menu: branch selection, the menu and the menu scrolled" },
        },
        {
          label: "The problem",
          body: "Almost 90% of customers ordered from their phones, but the menu wasn't built for mobile. Signing up took an email, a phone number and an email confirmation.",
          visual: { type: "stat", value: "~90%", label: "of orders came from phones" },
        },
        {
          label: "What I did",
          body: "Led the team that redesigned and rebuilt it in React. Sign-up moved inside checkout and only needs a phone number, verified by SMS.",
          visual: { type: "image", src: "/home/web-menu/3-signup.webp", alt: "The order, the phone number step and the SMS verification code" },
        },
        {
          label: "Result",
          body: "Shipped as a mobile-first ordering flow, with live order status so customers know where their order is.",
          visual: { type: "image", src: "/home/web-menu/4-status.webp", alt: "Order status steps and the order summary" },
        },
      ],
    },
  },
  {
    id: "cemex",
    title: "CEMEX Vertua",
    tagline: "Lead generation site · UX Researcher + UX/UI Designer",
    story: {
      eyebrow: "Lead generation · UX Researcher + UX/UI Designer",
      stage: "#DCE5F8",
      beats: [
        {
          label: "What it is",
          body: "A website to generate leads for Vertua, CEMEX's line of sustainable construction products.",
          visual: { type: "image", src: "/home/cemex/1-site.webp", alt: "The Vertua landing page" },
        },
        {
          label: "The problem",
          body: "Two audiences with different needs: architects and designers looking for inspiration, engineers looking for technical details.",
          visual: {
            type: "split",
            items: [
              { title: "Creative users", body: "Architects and designers, looking for inspiration." },
              { title: "Technical users", body: "Civil and structural engineers, looking for product details and tools." },
            ],
          },
        },
        {
          label: "What I did",
          body: "User research with personas and journeys, then one site with two paths: an inspiration search for creatives, product information and engineering tools for technical users.",
          visual: { type: "image", src: "/home/cemex/3-paths.webp", alt: "Inspiration for Architects and Tools for Engineers, side by side" },
        },
        {
          label: "Result",
          body: "A functional prototype of the Vertua website, within CEMEX's brand guidelines.",
          visual: { type: "image", src: "/home/cemex/4-prototype.webp", alt: "The case studies list and a project page" },
        },
      ],
    },
  },
  {
    id: "taconomics",
    title: "Taconomics",
    tagline: "Freelance · NFT marketplace · UX/UI + branding",
    story: {
      eyebrow: "Freelance · UX/UI + branding",
      stage: "#FFEFD3",
      beats: [
        {
          label: "What it is",
          body: "An NFT marketplace where Latino artists sell digital art, all of it related to tacos.",
          visual: { type: "image", src: "/home/taconomics/1-marketplace.webp", alt: "Taconomics home sliders for buying and selling art, on desktop and mobile" },
        },
        {
          label: "The problem",
          body: "Three kinds of users (collectors, artists and admins), two currencies needed to buy art, and no brand yet.",
          visual: { type: "image", src: "/home/taconomics/2-flow.webp", alt: "The platform's user flow diagram" },
        },
        {
          label: "What I did",
          body: "Requirements with the founder, user flows, the UI, and a brand: a smiling taco logo, type, colors and illustrations.",
          visual: { type: "image", src: "/home/taconomics/3-logo.webp", alt: "The Taconomics logo: a smiling taco above the wordmark" },
        },
        {
          label: "Result",
          body: "Designs and a brand for an NFT marketplace for Latino artists.",
          visual: { type: "image", src: "/home/taconomics/4-designs.webp", alt: "An artist's collection page" },
        },
      ],
    },
  },
  {
    id: "persona-lamps",
    title: "Persona Lamps",
    tagline: "NFT drop landing page · Design + Vue.js · 4,444 NFTs sold out",
    archived: true,
  },
];
