import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Props {}

const NavBar: React.FC = (props: Props) => {
  const { state, dispatch, setAlert } = useGlobalContext();
  const { is_authenticated, loading } = state;

  const auth_links = (
    <>
      <li>
        <span
          className="cursor-pointer"
          onClick={() => {
            dispatch({ type: "CLEAR_USER" });
            setAlert("success", "Logged out!");
          }}
        >
          Logout
        </span>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Menu as="div" className={"relative text-left"}>
          <Menu.Button className="inline-flex w-full justify-center items-center rounded-md bg-black bg-opacity-20 px-4 py-2 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Pokemons
            <ChevronDownIcon className="ml-2 h-5 w-5" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 flex flex-col mt-2 w-full overflow-hidden divide-gray-100 rounded-md bg-slate-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`py-2 px-4 font-mono ${active && "bg-blue-500"}`}
                  to="/pokemons/all"
                >
                  All
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`py-2 px-4 font-mono ${active && "bg-blue-500"}`}
                  to="/pokemons/owned"
                >
                  Owned
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`py-2 px-4 font-mono ${active && "bg-blue-500"}`}
                  to="/pokemons/catch"
                >
                  Catch!
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </li>
    </>
  );

  const guest_links = (
    <>
      <li className="nice-hover">
        <Link to="/login">Login</Link>
      </li>
      <li className="nice-hover">
        <Link to="/register">Register</Link>
      </li>
    </>
  );

  return (
    <nav className="py-6 px-12 flex text-white items-center font-poppins">
      <Link
        className="text-3xl nice-hover font-bold font-mono border-4 border-white py-2 px-4 rounded-lg"
        to="/"
      >
        Pokemon!
      </Link>
      <div className="ml-auto text-xl">
        <ul className="flex gap-4 items-center font-bold">
          {is_authenticated && !loading ? auth_links : guest_links}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
