import NavBar from "@/components/navbar/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import ToasterContext from "@/context/ToasterContext";
import AuthContext from "@/context/AuthContext";
import ModalsContext from "@/context/ModalsContext";
import { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/cookiebanner";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tylermoviesempire.com"),
  title: "The Best Movie Website - Latest Movie Reviews, Trailers & News",
  colorScheme: "light",
  themeColor: "light",
  keywords:
    "movie reviews, movie trailers, movie news, upcoming movies, film industry, best movies, top movie lists, movie website",
  description:
    "Discover the latest movie reviews, trailers and news on the best movie website. Get insider information on upcoming movies and stay up-to-date with the latest trends in the film industry. Our movie website is the ultimate destination for movie lovers. We provide you with the latest movie reviews, trailers, and news to keep you informed about everything happening in the world of cinema.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zinc-900" />
          </div>
        }
      >
        <GoogleAnalytics
          GA_MEASUREMENT_ID={
            process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID as string
          }
        />
      </Suspense>

      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ModalsContext />
          <NavBar />
          <div className="my-5"></div>
          {children}
        </AuthContext>

        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zinc-900" />
            </div>
          }
        >
          <CookieBanner />
        </Suspense>
      </body>
    </html>
  );
}
