import { UnitsDropdown } from '../../components';

export default function Navbar() {
  return (
    <header>
      <nav className="flex items-center justify-between">
        <div>
          <img src="/assets/images/logo.svg" alt="logo weather" />
        </div>

        <UnitsDropdown />
      </nav>
    </header>
  );
}
