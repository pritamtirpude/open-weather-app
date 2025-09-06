export default function Navbar() {
  return (
    <header className="py-12">
      <nav className="flex items-center justify-between">
        <div>
          <img src="/assets/images/logo.svg" alt="logo" />
        </div>

        <div>
          <h2 className="text-xl text-white">Units</h2>
        </div>
      </nav>
    </header>
  );
}
