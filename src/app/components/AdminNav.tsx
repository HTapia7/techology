import React from "react";
import Link from "next/link";
import CreateButton from "./CreateButton";
import UploadWidget from "./UploadWidget";

const AdminNav = () => {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "PRODUCTS", link: "/products" },
  ];

  return (
    <div className="bg-white shadow-md w-full top-0 left-0 z-10">
      <div className="flex items-center justify-between py-4 px-6 md:px-10">
        <div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800">
          <span>TechnoLogy</span>
        </div>
        <ul className="flex items-center space-x-8">
          {Links.map((link) => (
            <li key={link.name} className="text-xl">
              <Link href={link.link}>
                <span className="text-gray-800 hover:text-gray-400 duration-300 cursor-pointer">
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <CreateButton />
        <UploadWidget/>
      </div>
    </div>
  );
};

export default AdminNav;
