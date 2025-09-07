export default function Navbar() {
  return (
    <header>
      <nav className="flex items-center justify-between">
        <div>
          <img src="/assets/images/logo.svg" alt="logo weather" />
        </div>

        <div>
          <h2 className="text-xl text-white">Units</h2>
        </div>
      </nav>
    </header>
  );
}
