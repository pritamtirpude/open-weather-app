import { Navbar, SearchInput, Title, WeatherGrid } from './components';

export default function App() {
  return (
    <main className="flex min-h-screen flex-col justify-center lg:mx-auto lg:max-w-6xl">
      <Navbar />
      <Title />
      <SearchInput />
      <WeatherGrid />
    </main>
  );
}
