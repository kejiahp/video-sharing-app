import NavBar from "@/components/navbar/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import ToasterContext from "@/context/ToasterContext";
import AuthContext from "@/context/AuthContext";
import ModalsContext from "@/context/ModalsContext";
import getGenres from "@/actions/getGenres";
import { IGenre } from "@/models/Genre.model";
import { Metadata } from "next";

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
          <div className="my-5"></div>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
