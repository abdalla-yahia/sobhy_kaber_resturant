import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/Libs/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
    
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex-col`}
      >
        <ReduxProvider >
        {children}
        </ReduxProvider>
        <ToastContainer limit={1}/>
      </body>
    </html>
  );
}
