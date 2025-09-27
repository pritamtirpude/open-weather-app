import { Star } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { FavoriteModal, UnitsDropdown } from '../../components';

export default function Navbar() {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  return (
    <header>
      <nav className="flex items-center justify-between">
        <div>
          <img src="/assets/images/logo.svg" alt="logo weather" />
        </div>

        <div className="flex items-center gap-3">
          <div
            onClick={() => setIsFavoritesOpen((prev) => !prev)}
            className="bg-weather-800 relative flex cursor-pointer items-center gap-2.5 rounded-lg p-2.5 transition-all duration-150 focus:outline-2 focus:outline-offset-2 focus:outline-white md:px-4 md:py-3.5"
          >
            <Star fill="white" size={16} className="text-white" />
            <span className="font-dm-sans text-dm-sans-preset-7 hidden text-white md:block">
              Favorites
            </span>
            <AnimatePresence>
              {isFavoritesOpen && <FavoriteModal setIsFavoritesOpen={setIsFavoritesOpen} />}
            </AnimatePresence>
          </div>

          <UnitsDropdown />
        </div>
      </nav>
    </header>
  );
}
