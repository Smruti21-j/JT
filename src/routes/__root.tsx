import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import faviconIco from "@/assets/JT-logo-original-icon.ico?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { name: "author", content: "Jarvis Technolabs" },
  { property: "og:type", content: "website" },
  { property: "og:title", content: "Jarvis Technolabs — You Think, We Create" },
  { property: "og:description", content: "Navigating your digital transformation from first principles. AI-native partner for products, automation and enterprise..." },
  { property: "og:image", content: "https://jarvis3.smrutipanda790.workers.dev/og-image.png" },
  { property: "og:url", content: "https://jarvis3.smrutipanda790.workers.dev" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:image", content: "https://jarvis3.smrutipanda790.workers.dev/og-image.png" },
],
    links: [
      { rel: "icon", href: faviconIco },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}