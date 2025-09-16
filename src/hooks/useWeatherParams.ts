import { parseAsString, useQueryStates } from 'nuqs';

export function useWeatherParams() {
  const [params, setParams] = useQueryStates(
    {
      latitude: parseAsString,
      longitude: parseAsString,
      search: parseAsString,
      timezone: parseAsString,
    },
    {
      urlKeys: {
        latitude: 'lat',
        longitude: 'long',
        search: 'search',
        timezone: 'tz',
      },
    },
  );

  return { params, setParams };
}
