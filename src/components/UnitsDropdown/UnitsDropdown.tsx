import { AnimatePresence, motion } from 'motion/react';
import { Fragment, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { useWeatherParams } from '../../hooks/useWeatherParams';
import { cn } from '../../utils';
import { unitsList } from '../../utils/unitsList';

export default function UnitsDropdown() {
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [isOpen, setIsOpen] = useState(false);
  const { setParams, params } = useWeatherParams();

  const dropdownRef = useClickOutside(() => setIsOpen(false)) as React.RefObject<HTMLDivElement>;

  return (
    <div
      title="Units"
      ref={dropdownRef}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={cn(
        'bg-weather-800 relative cursor-pointer rounded-lg p-2.5 transition-all duration-150 focus:outline-2 focus:outline-offset-2 focus:outline-white md:px-4 md:py-3.5',
        !isOpen && 'hover:bg-weather-700',
      )}
    >
      <div className="z-50 flex items-center gap-2.5">
        <img src="/assets/images/icon-units.svg" alt="icon units" />
        <span className="font-dm-sans text-dm-sans-preset-7 text-white">Units</span>
        <img src="/assets/images/icon-dropdown.svg" alt="icon chevron down" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="bg-weather-800 border-weather-600 absolute top-14 right-0 z-40 h-auto w-[214px] transform rounded-xl border px-2 py-1.5 drop-shadow will-change-transform"
          >
            <div
              onClick={() => {
                if (units === 'imperial') {
                  setUnits('metric');
                  setParams({
                    temperatureUnit: 'celsius',
                    windSpeedUnit: 'kmh',
                    precipitationUnit: 'mm',
                  });
                } else {
                  setUnits('imperial');
                  setParams({
                    temperatureUnit: 'fahrenheit',
                    windSpeedUnit: 'mph',
                    precipitationUnit: 'inch',
                  });
                }
              }}
              className="hover:bg-weather-700 rounded-lg px-2 py-2.5 transition-all duration-150"
            >
              <span className="font-dm-sans text-dm-sans-preset-7 text-white capitalize">
                {units === 'imperial' ? 'Switch to metric' : 'Switch to imperial'}
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {unitsList.map((unit) => (
                <Fragment key={unit.title}>
                  <div className="mt-1 flex flex-col gap-2">
                    <span className="text-dm-sans-preset-8 font-dm-sans text-weather-300 ml-2 capitalize">
                      {unit.title}
                    </span>
                    {unit.units.map((u) => (
                      <div
                        key={u.value}
                        onClick={() =>
                          setParams({
                            [u.paramValue]: u.value,
                          })
                        }
                        className={cn(
                          'hover:bg-weather-700 flex items-center justify-between rounded-lg px-2 py-2.5 transition-all duration-150',
                          params[u.paramValue as keyof typeof params] === u.value
                            ? 'bg-weather-700'
                            : '',
                        )}
                      >
                        <span className="font-dm-sans text-dm-sans-preset-7 text-white">
                          {u.label}
                        </span>
                        {params[u.paramValue as keyof typeof params] === u.value && (
                          <img src="/assets/images/icon-checkmark.svg" alt="icon checkmark" />
                        )}
                      </div>
                    ))}
                  </div>
                  {unit.title === 'temperature' || unit.title === 'wind speed' ? (
                    <div className="bg-weather-600 h-[1px] w-full" />
                  ) : null}
                </Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
