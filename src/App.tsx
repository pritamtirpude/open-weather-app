import { Navbar, SearchInput, Title } from './components';

export default function App() {
  return (
    <main className="min-h-screen lg:mx-auto lg:max-w-6xl">
      <Navbar />
      <Title />
      <SearchInput />
    </main>
  );
}
