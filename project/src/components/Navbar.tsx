import { NavLink } from 'react-router-dom';
import { Trophy } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8" />
              <span className="text-xl font-bold">EPIC Event</span>
            </NavLink>
          </div>
          <div className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 ${
                  isActive ? 'bg-indigo-700' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/scores"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 ${
                  isActive ? 'bg-indigo-700' : ''
                }`
              }
            >
              Live Scores
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 ${
                  isActive ? 'bg-indigo-700' : ''
                }`
              }
            >
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}