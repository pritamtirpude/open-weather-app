import { useMutation } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';
import { CircleX, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CircleFlag } from 'react-circle-flags';
import type { FavoriteLocation } from '../..';
import { fetchSearch } from '../../api';
import useClickOutside from '../../hooks/useClickOutside';
import { useWeatherParams } from '../../hooks/useWeatherParams';
import { db } from '../../indexeddb/db';
import { useSearchStore } from '../../store/searchStore';

type FavoriteModalProps = {
  setIsFavoritesOpen: (isOpen: boolean) => void;
};

export default function FavoriteModal({ setIsFavoritesOpen }: FavoriteModalProps) {
  const { setParams } = useWeatherParams();

  const { setSelectedLocation } = useSearchStore();

  const searchMutation = useMutation({
    mutationFn: fetchSearch,
    onSuccess: (data) => {
      if (data?.results?.length > 0) {
        setSelectedLocation(data.results[0]);
      } else {
        setSelectedLocation(null);
      }
    },
  });

  const modalRef = useClickOutside(() =>
    setIsFavoritesOpen(false),
  ) as React.RefObject<HTMLDivElement>;

  const favorites = useLiveQuery<FavoriteLocation[]>(() => db.favorites.toArray(), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex size-full items-center justify-center bg-black/50 backdrop-blur-md"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.85,
          transition: {
            ease: [0.67, 0.17, 0.62, 0.64],
          },
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            delay: 0.2,
            duration: 0.2,
            ease: [0.17, 0.67, 0.51, 1],
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.85,
          transition: {
            ease: [0.67, 0.17, 0.62, 0.64],
            opacity: {
              delay: 0.2,
              duration: 0.2,
              ease: 'easeOut',
            },
          },
        }}
        ref={modalRef}
        layout
        className="bg-weather-800 w-11/12 rounded-xl p-4 md:w-[600px]"
      >
        <div className="flex items-center justify-between">
          <h1 className="font-dm-sans text-dm-sans-preset-4 text-white">Favorites</h1>
          <CircleX onClick={() => setIsFavoritesOpen(false)} className="size-6 text-white" />
        </div>

        <motion.ul
          layout
          className="scrollbar-hide mt-6 flex h-[400px] flex-col gap-2.5 overflow-hidden overflow-y-auto md:h-[600px]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {favorites && favorites.length > 0 ? (
              favorites.map((favorite) => (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    setParams({
                      latitude: favorite.latitude.toString(),
                      longitude: favorite.longitude.toString(),
                      timezone: favorite.timezone,
                    });
                    searchMutation.mutate(favorite.name);
                    setIsFavoritesOpen(false);
                  }}
                  key={favorite.id}
                  className="bg-weather-700 hover:bg-weather-600 flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition-all duration-150"
                >
                  <div className="flex items-center gap-2.5">
                    <CircleFlag
                      countryCode={favorite.country_code.toLowerCase() || 'us'}
                      className="size-10"
                    />
                    <motion.div layout className="flex flex-col gap-0.5">
                      <span className="text-dm-sans-preset-7 font-dm-sans text-white">
                        {favorite.name}
                      </span>
                      <span className="font-dm-sans text-dm-sans-preset-8 text-weather-300">
                        {favorite.admin1}, {favorite.country}
                      </span>
                    </motion.div>
                  </div>

                  <div
                    className="hover:bg-weather-800 rounded-lg p-2 transition-all duration-150"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash2
                      size={20}
                      className="text-white"
                      onClick={() => db.favorites.delete(favorite.id)}
                    />
                  </div>
                </motion.li>
              ))
            ) : (
              <li className="flex items-center justify-center">
                <span className="font-dm-sans text-dm-sans-preset-4 text-white">
                  No favorites added
                </span>
              </li>
            )}
          </AnimatePresence>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
