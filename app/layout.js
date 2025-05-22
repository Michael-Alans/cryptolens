import { Geist, Geist_Mono } from "next/font/google";
import "./index.css";
import Header from "./components/Header";
import ClientProvider from "./components/ClientProvider";
import ThemeWrapper from "./themeWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <ThemeWrapper>
           <Header />
           {children}
          </ThemeWrapper>
        </ClientProvider>
      </body>
    </html>
  );
}
