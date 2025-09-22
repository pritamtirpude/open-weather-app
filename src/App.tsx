import { useQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { fetchWeatherData } from './api';
import { APIErrorMessage, Navbar, SearchInput, Title, WeatherGrid } from './components';
import { useWeatherParams } from './hooks/useWeatherParams';
import { useSearchStore } from './store/searchStore';

export default function App() {
  const { params, setParams } = useWeatherParams();
  const { selectedLocation } = useSearchStore();

  // Get geolocation if no location params and no selected location
  useEffect(() => {
    if (!params.latitude && !params.longitude && !selectedLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setParams({
              latitude: position.coords.latitude.toFixed(4),
              longitude: position.coords.longitude.toFixed(4),
              timezone: 'auto',
            });
          },
          () => {
            return;
          },
        );
      }
    }
  }, [params.latitude, params.longitude, selectedLocation, setParams]);

  const {
    data: weatherData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['weatherData', params],
    queryFn: () =>
      fetchWeatherData(
        Number(selectedLocation?.latitude ?? params.latitude),
        Number(selectedLocation?.longitude ?? params.longitude),
        selectedLocation?.timezone ?? params.timezone ?? 'GMT',
        params?.temperatureUnit || 'celsius',
        params?.windSpeedUnit || 'kmh',
        params?.precipitationUnit || 'mm',
      ),
    enabled: !!(params.latitude && params.longitude && params.timezone),
  });

  return (
    <main className="min-h-screen px-4 pt-4 pb-12 md:px-6 md:pt-6 md:pb-20 lg:mx-auto lg:max-w-6xl lg:px-0 lg:pt-12 lg:pb-20">
      <Navbar />
      {isError ? (
        <APIErrorMessage refetch={refetch} />
      ) : (
        <Fragment>
          <Title />
          <SearchInput />
          <WeatherGrid isLoading={isLoading} weatherData={weatherData} />
        </Fragment>
      )}
    </main>
  );
}
