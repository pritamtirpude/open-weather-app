import { Navbar, SearchInput, Title, WeatherGrid } from './components';

export default function App() {
  return (
    <main className="flex min-h-screen flex-col justify-center px-4 pt-4 pb-12 md:px-6 md:pt-6 md:pb-20 lg:mx-auto lg:max-w-6xl lg:px-0 lg:pt-12 lg:pb-20">
      <Navbar />
      <Title />
      <SearchInput />
      <WeatherGrid />
    </main>
  );
}
