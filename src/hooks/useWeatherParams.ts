import { parseAsString, useQueryStates } from 'nuqs';

export function useWeatherParams() {
  const [params, setParams] = useQueryStates(
    {
      latitude: parseAsString,
      longitude: parseAsString,
      timezone: parseAsString,
      temperatureUnit: parseAsString.withDefault('celsius'),
      windSpeedUnit: parseAsString.withDefault('kmh'),
      precipitationUnit: parseAsString.withDefault('mm'),
    },
    {
      urlKeys: {
        latitude: 'lat',
        longitude: 'long',
        timezone: 'tz',
        temperatureUnit: 'tempUnit',
        windSpeedUnit: 'windUnit',
        precipitationUnit: 'precipUnit',
      },
    },
  );

  return { params, setParams };
}
