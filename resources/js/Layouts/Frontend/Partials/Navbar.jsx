import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const { auth } = usePage().props;

  const handleLogout = (e) => {
    e.preventDefault();
    router.post('/logout');
  };

  return (
    <nav className="bg-white shadow">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex justify-between h-16">
          <div className='flex items-center'>
            <img src="/assets/images/concrete-logo.png" alt="concrete logo" className='object-contain w-10 h-10' />
          </div>

          <div className="flex items-center">
            {auth?.user ? (
              <>
                <img
                  className="w-8 h-8 rounded-full"
                  src={auth.user.photo || 'https://via.placeholder.com/32'}
                  alt="User Profile"
                />
                <div className="relative ml-2">
                  <button onClick={toggleDropdown} className="text-gray-700 focus:outline-none">
                    {auth.user.name || 'User'}{' '}
                    <svg className="inline w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute w-32 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu">
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-sm text-left text-gray-700"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
