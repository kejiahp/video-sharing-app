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
                { title: "Terms & Conditions", link: "" },
                { title: "Privacy", link: "" },
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
                { title: "FaceBook", link: "" },
                { title: "Twitter", link: "" },
                { title: "Instagram", link: "" },
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
            <p className="uppercase text-black md:mb-6">Company</p>
            <ul className="list-reset mb-6">
              {[
                { title: "Official Blog", link: "" },
                { title: "About Us", link: "" },
                { title: "Contact Us", link: "" },
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
          © Clever Video Sharing - {new Date().getFullYear()}
        </p>
      </section>
    </footer>
  );
};

export default Footer;
