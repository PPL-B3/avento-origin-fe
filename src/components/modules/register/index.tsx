'use client';

import { useState } from 'react';
import { AuthTabs, Logo, RegistrationForm } from './elements';

export function RegisterModule() {
  const [activeTab, setActiveTab] = useState('REGISTRASI');

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg ">
        <div className="flex flex-col items-center mb-8">
          <Logo />
        </div>
        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'REGISTRASI' && <RegistrationForm />}
      </div>
    </div>
  );
}
