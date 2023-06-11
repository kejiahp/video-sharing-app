import NavBar from "@/components/navbar/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import ToasterContext from "@/context/ToasterContext";
import AuthContext from "@/context/AuthContext";
import RenameGenre from "@/components/admin/genre/RenameGenre";
import DeleteGenre from "@/components/admin/genre/DeleteGenre";
import ModalsContext from "@/context/ModalsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Video Sharing Application",
  description: "This is a video sharing application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ModalsContext />
          <NavBar />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
