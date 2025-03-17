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

  const goToDashboard = () => {
    router.visit('/dashboard');
  };

  return (
    <nav className="bg-white shadow">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex justify-between h-16">
          <div className='flex items-center cursor-pointer' onClick={goToDashboard}>
            <img src="/assets/images/concrete-logo.png" alt="concrete logo" className='object-contain w-10 h-10' />
            {/* <span className='ml-5 font-bold uppercase lg:text-base md:text-base '>CONCRETE CLOCK IN</span> */}
          </div>

          <div className="flex items-center">
            {auth?.user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700"
                >
                  <span className='font-bold'>Logout</span>,&nbsp;&nbsp;<span className='font-extrabold'>{auth.user.name || 'User'}</span>
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
