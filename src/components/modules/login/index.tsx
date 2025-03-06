'use client';

import { useState } from 'react';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import Logo from './components/Logo';

export function LoginModule() {
  const [activeTab, setActiveTab] = useState('LOGIN');

  return (
    <div className="flex min-h-screen items-center justify-center  bg-white px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg ">
        <div className="flex flex-col items-center mb-8">
          <Logo />
        </div>
        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'LOGIN' && <LoginForm />}
      </div>
    </div>
  );
}
