import { useForm } from '@inertiajs/react';
import React from 'react';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  // Update state on input change
  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login', {
      preserveScroll: true,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {errors.email && <div className="mt-1 text-red-500">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {errors.password && <div className="mt-1 text-red-500">{errors.password}</div>}
          </div>
          <button
            disabled={processing}
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
