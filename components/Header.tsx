
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm p-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem of India" className="h-10 w-10 mr-4"/>
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Project Samarth</h1>
            <p className="text-sm text-gray-500">Intelligent Q&A on India's Agriculture & Climate Data</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
