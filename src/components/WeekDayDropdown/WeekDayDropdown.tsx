import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import useClickOutside from '../../hooks/useClickOutside';
import { useFilterStore } from '../../store/filterStore';
import { weekDays } from '../../utils/weekDays';

export default function WeekDayDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false)) as React.RefObject<HTMLDivElement>;

  const { selectedDay, setSelectedDay } = useFilterStore();
  return (
    <div
      ref={dropdownRef}
      tabIndex={0}
      className="bg-weather-600 relative cursor-pointer rounded-lg px-4 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-white"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex items-center gap-3">
        <span className="font-dm-sans text-dm-sans-preset-7 text-white">{selectedDay}</span>
        <img src="/assets/images/icon-dropdown.svg" alt="icon dropdown" />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.85 }}
            tabIndex={0}
            className="bg-weather-800 border-weather-600 absolute top-12 right-0 h-auto w-[214px] transform rounded-xl border p-2 drop-shadow will-change-transform"
          >
            <ul>
              {weekDays.map((day, index) => (
                <li
                  tabIndex={index}
                  onClick={() => setSelectedDay(day)}
                  key={day}
                  className="font-dm-sans text-dm-sans-preset-7 hover:bg-weather-700 px-2 py-2.5 text-white transition-all duration-150 hover:rounded-lg"
                >
                  {day}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
