"use client";
import React from "react";
import FooterListItems from "./FooterListItems";

const Footer = () => {
  return (
    <footer className="bg-white gradient">
      <div className="container mx-auto px-8">
        <div className="w-full flex flex-col md:flex-row py-6">
          <div className="flex-1">
            <p className="uppercase text-black md:mb-6">Legal</p>
            <ul className="list-reset mb-6">
              {[
                { title: "Advertise with Us", link: "/advertise-with-us" },
                { title: "Terms & Conditions", link: "/terms-and-conditions" },
                {
                  title: "Advertisment Terms & Conditions",
                  link: "/advertisement-terms-and-conditions",
                },
                { title: "About Us", link: "/about-us" },
                {
                  title: "Digital Millennium Copyright Act (DMCA)",
                  link: "dmca",
                },
              ].map((item, index) => (
                <FooterListItems
                  key={index}
                  title={item.title}
                  link={item.link}
                />
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-black md:mb-6">Social</p>
            <ul className="list-reset mb-6">
              {[
                {
                  title: "FaceBook",
                  link: "https://www.facebook.com/TylerMoviesEmpire",
                },
                {
                  title: "X",
                  link: "https://twitter.com/TYMoviesEmpire?t=HqbXsnX8s7kYsW9L2YK0qg&s=09",
                },
                {
                  title: "Instagram",
                  link: "https://instagram.com/tylermoviesempire",
                },
                { title: "Telegram", link: "https://t.me/TylerMoviesEmpire01" },
              ].map((item, index) => (
                <FooterListItems
                  title={item.title}
                  link={item.link}
                  key={index}
                />
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-black md:mb-6">Contact</p>
            <ul className="list-reset mb-6">
              {[
                { title: "+234 701 3255 852", link: "tel:+2347013255852" },
                {
                  title: "tylermoviesempire@gmail.com",
                  link: "mailto:tylermoviesempire@gmail.com",
                },
              ].map((item, index) => (
                <FooterListItems
                  key={index}
                  title={item.title}
                  link={item.link}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <section className="flex justify-center items-center">
        <p className="text-white text-sm">
          Tyler Movies Empire © {new Date().getFullYear()}
        </p>
      </section>
    </footer>
  );
};

export default Footer;
