import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'text-green-500 border border-green-500 bg-green-50 rounded-md px-3 py-2' : 'text-black px-3 py-2 rounded-md'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive ? 'text-green-500 border border-green-500 bg-green-50 rounded-md px-3 py-2' : 'text-black px-3 py-2 rounded-md'
          }
        >
          Listed books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/page-to-read"
          className={({ isActive }) =>
            isActive ? 'text-green-500 border border-green-500 bg-green-50 rounded-md px-3 py-2' : 'text-black px-3 py-2 rounded-md'
          }
        >
          Page to read
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
    <nav className="bg-base-100 shadow-sm" >
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {Links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">BookVibe</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Links}</ul>
        </div>

        <div className="navbar-end gap-4">
          <button className="btn btn-success text-white">sign in</button>
          <button className="btn btn-success text-white">sign up</button>
        </div>
      </div>
      </nav>
    </div>
  );
};

export default Navbar;