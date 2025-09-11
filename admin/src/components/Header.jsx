import icon from '/icon.PNG';

function Header() {
  return (
    <header className="bg-black text-white p-2 flex justify-between items-center shadow-md">
      <h1 className="flex items-center text-3xl font-sans font-semibold"><img src={icon} alt="LexEye" className="h-20  mr-2" /> LexEye</h1>
      <nav>
        <span className="text-sm">Know Your Rights, Own Your Power</span>
      </nav>
    </header>
  );
}

export default Header;
