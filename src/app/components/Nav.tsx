import React from "react"

const Nav = () => {

  let Links = [
    {name: "HOME", link: "/"},
    {name: "Product", link: "/"},
    {name: "Sign Up", link: "/signup"},
    {name: "Sign In", link: "/signin"}
  ];

  return (
    <div className="shadow-md w-full top-0 left-0 ">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-4 px-7">
      <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
        <span>
        TechnoLogy
        </span>
      </div>
      <ul className="md:flex md:items-center ">
        {
          Links.map((link ) =>(
            <li key={link.name} className="md:ml-8 text-xl">
              <a href={link.link} className="text-gray-800 hover:text-gray-400 duration-500">{link.name}</a>
            </li>
          ) )
        }
      </ul>
      </div>
    </div>
  )
}

export default Nav