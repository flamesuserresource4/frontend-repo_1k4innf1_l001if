import Navbar from './components/Navbar';
import HeroSpline from './components/HeroSpline';
import AuthPanel from './components/AuthPanel';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <Navbar />
      <main>
        <HeroSpline />
        <AuthPanel />
        <Dashboard />
      </main>
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-neutral-500 dark:text-neutral-400">
          <p>
            Built for a clean, minimal task experience with categories, priorities, difficulties, XP, collaboration, and accessible design. Fully responsive with light/dark modes.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
