
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Home } from 'lucide-react';
import { NAV_ITEMS } from '../data';

interface HeaderProps {
  onStartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-white py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-8 h-8 bg-dorren-dark text-white flex items-center justify-center font-bold text-xl rounded">D</div>
          <span className="text-2xl font-bold tracking-tight text-dorren-dark">DORREN</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="text-sm font-medium text-gray-600 hover:text-dorren-dark transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button onClick={onStartClick} className="bg-dorren-dark text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-opacity-90 transition-all">
            Начать обучение
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-dorren-dark"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 md:hidden flex flex-col gap-4 shadow-lg">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
            >
              {item.label}
            </a>
          ))}
          <button onClick={() => { onStartClick(); setMobileMenuOpen(false); }} className="bg-dorren-dark text-white px-4 py-3 rounded text-center font-semibold mt-2 w-full">
            Начать обучение
          </button>
        </div>
      )}
    </header>
  );
};

interface LessonHeaderProps {
  lessonId: string;
  title: string;
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({ lessonId, title, onBack, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getModuleTitle = () => {
    if (lessonId.startsWith('1.')) return 'Модуль 1';
    if (lessonId.startsWith('2.')) return 'Модуль 2';
    return 'Модуль';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-gray-500 hover:text-dorren-dark transition-colors"
            title="На главную"
          >
            <Home size={18} />
          </button>
          
          <ChevronRight size={16} className="text-gray-300 shrink-0" />
          
          <span className="text-gray-500 text-sm hidden sm:inline truncate">{getModuleTitle()}</span>
          
          <ChevronRight size={16} className="text-gray-300 hidden sm:block shrink-0" />
          
          <div className="flex flex-col">
            <span className="text-xs font-bold text-dorren-light uppercase tracking-widest">Урок {lessonId}</span>
            <span className="text-sm font-bold text-dorren-dark truncate max-w-[150px] sm:max-w-md">{title}</span>
          </div>
        </div>

        {/* Lesson Menu */}
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <Menu size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fade-in max-h-[80vh] overflow-y-auto">
              <div className="px-4 py-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase">Навигация</span>
              </div>
              <button onClick={() => onNavigate('landing')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-dorren-dark">
                Главная страница курса
              </button>
              
              {/* Module 1 */}
              <div className="px-4 py-2 border-t border-b border-gray-100 mt-1 bg-gray-50/50">
                <span className="text-xs font-bold text-gray-500 uppercase">Модуль 1</span>
              </div>
              <button 
                onClick={() => onNavigate('lesson1.1')} 
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex justify-between items-center ${lessonId === '1.1' ? 'text-dorren-dark font-bold bg-gray-50' : 'text-gray-600'}`}
              >
                1.1. Кто мы
                {lessonId === '1.1' && <div className="w-1.5 h-1.5 rounded-full bg-dorren-light"></div>}
              </button>
              <button 
                onClick={() => onNavigate('lesson1.2')} 
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex justify-between items-center ${lessonId === '1.2' ? 'text-dorren-dark font-bold bg-gray-50' : 'text-gray-600'}`}
              >
                1.2. Жизненный цикл
                {lessonId === '1.2' && <div className="w-1.5 h-1.5 rounded-full bg-dorren-light"></div>}
              </button>
              <button 
                onClick={() => onNavigate('lesson1.3')} 
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex justify-between items-center ${lessonId === '1.3' ? 'text-dorren-dark font-bold bg-gray-50' : 'text-gray-600'}`}
              >
                1.3. Документы
                {lessonId === '1.3' && <div className="w-1.5 h-1.5 rounded-full bg-dorren-light"></div>}
              </button>

              {/* Module 2 */}
              <div className="px-4 py-2 border-t border-b border-gray-100 mt-1 bg-gray-50/50">
                <span className="text-xs font-bold text-gray-500 uppercase">Модуль 2</span>
              </div>
              <button 
                onClick={() => onNavigate('lesson2.1')} 
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex justify-between items-center ${lessonId === '2.1' ? 'text-dorren-dark font-bold bg-gray-50' : 'text-gray-600'}`}
              >
                2.1. Группы решений
                {lessonId === '2.1' && <div className="w-1.5 h-1.5 rounded-full bg-dorren-light"></div>}
              </button>
              <button 
                onClick={() => onNavigate('lesson2.2')} 
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex justify-between items-center ${lessonId === '2.2' ? 'text-dorren-dark font-bold bg-gray-50' : 'text-gray-600'}`}
              >
                2.2. Параметры
                {lessonId === '2.2' && <div className="w-1.5 h-1.5 rounded-full bg-dorren-light"></div>}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dorren-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-dorren-dark flex items-center justify-center font-bold text-xl rounded">D</div>
            <span className="text-2xl font-bold tracking-tight">DORREN</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DORREN Door Solutions. Внутренний обучающий портал.
          </p>
        </div>
      </div>
    </footer>
  );
};
