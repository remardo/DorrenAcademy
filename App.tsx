
import React, { useState } from 'react';
import { Header, Footer } from './components/Navigation';
import { Hero } from './components/Hero';
import { WhyCourse, Audience, Results } from './components/Features';
import { Curriculum } from './components/Curriculum';
import { CompanyInfo, Format, FAQSection } from './components/Details';
import { Lesson1_1 } from './components/Lesson1_1';
import { Lesson1_2 } from './components/Lesson1_2';
import { Lesson1_3 } from './components/Lesson1_3';
import { Lesson2_1 } from './components/Lesson2_1';
import { Lesson2_2 } from './components/Lesson2_2';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'lesson1.1' | 'lesson1.2' | 'lesson1.3' | 'lesson2.1' | 'lesson2.2'>('landing');

  const handleNavigate = (view: string) => {
    window.scrollTo(0, 0);
    // Simple validation for type safety
    if (view === 'landing' || view === 'lesson1.1' || view === 'lesson1.2' || view === 'lesson1.3' || view === 'lesson2.1' || view === 'lesson2.2') {
      setCurrentView(view as any);
    } else {
      setCurrentView('landing');
    }
  };

  const handleStartLesson = () => handleNavigate('lesson1.1');

  if (currentView === 'lesson1.1') {
    return <Lesson1_1 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson1.2') {
    return <Lesson1_2 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson1.3') {
    return <Lesson1_3 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson2.1') {
    return <Lesson2_1 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson2.2') {
    return <Lesson2_2 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-dorren-light/30">
      <Header onStartClick={handleStartLesson} />
      <main>
        <Hero onStartClick={handleStartLesson} />
        <WhyCourse />
        <Audience />
        <Results />
        <Curriculum onLessonStart={handleNavigate} />
        <CompanyInfo />
        <Format />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;