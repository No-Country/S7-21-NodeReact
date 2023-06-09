import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import Navbar from "~/components/Navbar";

import styles from "~/styles/main.css";


import 'react-calendar/dist/Calendar.css';
import { PersistGate } from 'redux-persist/integration/react'
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";


export const meta = () => ({
  charset: "utf-8",
  title: "The Boss",
  viewport: "width=device-width,initial-scale=1",
});

export function loader() {
  return {
    ENV: {
      REMIX_APP_API_UR: process.env.REMIX_APP_API_UR,
    },
  }
}
function Document({ title, children }) {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}

        <Meta />
        <Links />
      </head>
      <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
            )}`,
          }}
        />
        <Scripts />
      <body>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Navbar />
            {children}
            <Footer />
          </PersistGate>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Provider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <ToastContainer />
      <Outlet />
    </Document>
  )
}
export function ErrorBoundary({ error }) {
  console.log(error);
  return (
    <Document title="Ha ocurrido un error">
      <main className="min-h-screen">
        <div>
          <p>{error.message || "Algo ha fallado. Intente de nuevo."}</p>
        </div>

      </main>
    </Document>
  );
}
export function links() {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: "/favicon.ico",
    },
  ];
}
