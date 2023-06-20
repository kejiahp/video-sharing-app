import NavBar from "@/components/navbar/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import ToasterContext from "@/context/ToasterContext";
import AuthContext from "@/context/AuthContext";
import ModalsContext from "@/context/ModalsContext";
import getGenres from "@/actions/getGenres";
import { IGenre } from "@/models/Genre.model";

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
  const genreAll: (IGenre & { _id: string })[] = await getGenres();

  let genreOptions: any[] = [];
  if (genreAll) {
    genreOptions = genreAll?.map((item) => ({
      title: item.name,
      link: `/genre/${item.name}/${item._id}`,
    }));
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ModalsContext />
          <NavBar genreAll={genreOptions} />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
