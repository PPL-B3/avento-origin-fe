'use client';

interface AuthTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AuthTabs: React.FC<AuthTabsProps> = ({
  activeTab,
  setActiveTab,
}) => (
  <div className="flex w-full justify-center mb-4">
    {['LOGIN', 'REGISTRASI'].map((tab) => (
      <button
        key={tab}
        className={`px-4 py-2 ${
          activeTab === tab
            ? 'border-b-2 border-[#2C4B5C] text-[#2C4B5C] font-bold'
            : 'text-[#2C4B5C]'
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);
