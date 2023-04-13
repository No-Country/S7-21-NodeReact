import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import Navbar from "~/components/Navbar";

import styles from "~/styles/main.css";
import { PersistGate } from 'redux-persist/integration/react'
import Footer from "./components/Footer";


export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
      {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
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
export default function App(){
  return (
    <Document>
      <Outlet/>
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
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
    },
  ];
}
