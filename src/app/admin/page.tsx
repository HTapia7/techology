"use client";
import React from 'react';
import AdminNav from '../components/AdminNav';
import Dashboard from '../components/Dashboard';

const Adminpage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="pt-10 p-4">
        <Dashboard />
      </div>
    </div>
  );
}

export default Adminpage;

