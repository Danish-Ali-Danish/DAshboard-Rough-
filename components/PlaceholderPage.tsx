
import React from 'react';
import { SettingsIcon } from '../constants';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center text-platinum">
      <SettingsIcon className="w-24 h-24 text-graphite animate-spin" style={{ animationDuration: '10s' }} />
      <h1 className="mt-8 text-4xl font-display text-gold">{title}</h1>
      <p className="mt-4 text-lg">This section is currently under development.</p>
      <p className="mt-2 text-gray-500">Please check back later for updates.</p>
    </div>
  );
};

export default PlaceholderPage;
