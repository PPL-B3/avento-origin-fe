'use client';
import { useRouter } from 'next/navigation';

interface AuthTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AuthTabs: React.FC<AuthTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const router = useRouter();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    router.push(tab === 'LOGIN' ? '/login' : '/register');
  };

  return (
    <div className="flex w-full justify-center mb-4">
      {['LOGIN', 'REGISTRASI'].map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 ${
            activeTab === tab
              ? 'border-b-2 border-dark text-dark font-bold'
              : 'text-dark'
          }`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
