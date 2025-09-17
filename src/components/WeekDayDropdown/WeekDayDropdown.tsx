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
      className="bg-weather-600 relative cursor-pointer rounded-lg px-4 py-2"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex items-center gap-3">
        <span className="font-dm-sans text-dm-sans-preset-7 text-white">{selectedDay}</span>
        <img src="/assets/images/icon-dropdown.svg" alt="icon dropdown" />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="bg-weather-800 border-weather-600 absolute top-full right-full left-0 h-auto w-[214px] rounded-xl border p-2 drop-shadow"
        >
          <ul>
            {weekDays.map((day) => (
              <li
                onClick={() => setSelectedDay(day)}
                key={day}
                className="font-dm-sans text-dm-sans-preset-7 hover:bg-weather-700 px-2 py-2.5 text-white transition-all duration-150 hover:rounded-lg"
              >
                {day}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
