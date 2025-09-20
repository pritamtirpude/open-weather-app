import { parseAsString, useQueryStates } from 'nuqs';

export function useWeatherParams() {
  const [params, setParams] = useQueryStates(
    {
      latitude: parseAsString,
      longitude: parseAsString,
      search: parseAsString,
      timezone: parseAsString,
      temperatureUnit: parseAsString,
      windSpeedUnit: parseAsString,
      precipitationUnit: parseAsString,
    },
    {
      urlKeys: {
        latitude: 'lat',
        longitude: 'long',
        search: 'search',
        timezone: 'tz',
        temperatureUnit: 'tempUnit',
        windSpeedUnit: 'windUnit',
        precipitationUnit: 'precipUnit',
      },
    },
  );

  return { params, setParams };
}
