import React, { useState } from "react";
import {
  HomeIcon,
  ShoppingCartIcon,
  SunIcon,
  MoonIcon,
  UsersIcon,
  CubeIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import Orders from "../components/Orders";
import Product from "../components/Product";
import User from "../components/User";
import Dashboard from "../components/Dashboard";

const NAVIGATION = [
  {
    segment: "Dashboard",
    title: "Dashboard",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    segment: "Orders",
    title: "Orders",
    icon: <ShoppingCartIcon className="w-5 h-5" />,
  },
  {
    segment: "Product",
    title: "Product",
    icon: <CubeIcon className="w-5 h-5" />,
  },
  { segment: "User", title: "User", icon: <UsersIcon className="w-5 h-5" /> },
];

const accounts = [
  {
    id: 1,
    name: "Bharat Kashyap",
    email: "bharatkashyap@outlook.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
  },
  {
    id: 2,
    name: "Bharat MUI",
    email: "bharat@mui.com",
    color: "bg-yellow-600",
  },
];

export default function Admin() {
  const [darkMode, setDarkMode] = useState(false);
  const [pathname, setPathname] = useState("Dashboard");
  const [openAccount, setOpenAccount] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const renderPage = () => {
    switch (pathname) {
      case "Dashboard":
        return <Dashboard />;
      case "Orders":
        return <Orders />;
      case "Product":
        return <Product />;
      case "User":
        return <User />;
      default:
        return <p>Not Found</p>;
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Sidebar for Desktop */}
      <aside
        className="
          hidden md:flex
          flex-col w-64 p-4
          bg-gray-100 dark:bg-gray-900 justify-between
        "
      >
        <div>
          <h2 className="mb-4 text-gray-500 text-sm font-semibold uppercase">
            TOOLPAD
          </h2>
          <nav>
            {NAVIGATION.map((item) => (
              <button
                key={item.segment}
                onClick={() => setPathname(item.segment)}
                className={`
                  flex w-full px-3 py-2 mb-1 text-left rounded-lg
                  items-center gap-2
                  ${
                    pathname === item.segment
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer account */}
        <div className="relative">
          <button
            onClick={() => setOpenAccount(!openAccount)}
            className="flex w-full p-2 rounded-lg items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <UserCircleIcon className="w-8 h-8 text-gray-500" />
            <span className="text-gray-700 font-medium dark:text-gray-200">
              Accounts
            </span>
          </button>
          {openAccount && (
            <div className="w-56 p-2 bg-white rounded-lg shadow-lg absolute bottom-12 left-0 dark:bg-gray-800">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex p-2 rounded-lg cursor-pointer items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {account.image ? (
                    <img
                      src={account.image}
                      alt={account.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div
                      className={`flex w-8 h-8 text-white rounded-full items-center justify-center ${
                        account.color || "bg-gray-500"
                      }`}
                    >
                      {account.name[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {account.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {account.email}
                    </p>
                  </div>
                </div>
              ))}
              <button className="w-full px-2 py-1 mt-2 text-left text-red-500 text-sm rounded dark:hover:bg-gray-700">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Sidebar for Mobile */}
      {openSidebar && (
        <div className="fixed inset-0 z-40 flex">
          <div className="flex flex-col w-64 p-4 bg-gray-100 dark:bg-gray-900">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-500 text-sm font-semibold uppercase">
                TOOLPAD
              </h2>
              <button onClick={() => setOpenSidebar(false)}>
                <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </button>
            </div>
            <nav>
              {NAVIGATION.map((item) => (
                <button
                  key={item.segment}
                  onClick={() => {
                    setPathname(item.segment);
                    setOpenSidebar(false);
                  }}
                  className={`
                    flex w-full px-3 py-2 mb-1 text-left rounded-lg
                    items-center gap-2
                    ${
                      pathname === item.segment
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              ))}
            </nav>
          </div>
          {/* overlay */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setOpenSidebar(false)}
          ></div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full min-w-0 text-gray-900 bg-white dark:bg-gray-950 dark:text-gray-100">
        {/* Toolbar */}
        <header className="flex p-4 border-b border-gray-200 justify-between items-center dark:border-gray-700">
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              onClick={() => setOpenSidebar(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">{pathname}</h1>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6" />
            ) : (
              <MoonIcon className="w-6 h-6" />
            )}
          </button>
        </header>

        {/* Page Content */}
        <div className="w-full p-6">{renderPage()}</div>
      </main>
    </div>
  );
}
