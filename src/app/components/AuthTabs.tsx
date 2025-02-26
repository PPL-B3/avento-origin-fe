'use client';

interface AuthTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, setActiveTab }) => (
  <div className="flex w-full justify-center mb-4">
    {['LOGIN', 'REGISTRASI'].map((tab) => (
      <button
        key={tab}
        className={`px-4 py-2 ${
          activeTab === tab
            ? 'border-b-2 border-dark text-dark font-bold'
            : 'text-dark'
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default AuthTabs;
