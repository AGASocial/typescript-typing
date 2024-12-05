import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function Sidebar({ isOpen, onToggle, children }: SidebarProps) {
  return (
    <div 
      className={`bg-white shadow-sm transition-all duration-300 flex ${
        isOpen ? 'w-80' : 'w-12'
      }`}
    >
      <div className={`flex-1 overflow-auto ${isOpen ? 'block' : 'hidden'}`}>
        {children}
      </div>
      <button
        onClick={onToggle}
        className="p-2 hover:bg-gray-100 self-start mt-2"
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isOpen ? (
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </div>
  );
}