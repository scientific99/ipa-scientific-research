function Header() {
  return (
    <header className="ursor-pointer fixed left-0 right-0 top-0 z-10 flex items-center bg-gray px-4 py-4 text-gray-500">
      <a href="./" className="ursor-pointer fixed left-0 right-0 top-0 z-10 flex items-center bg-gray px-4 py-4 text-white">
        <img
          className="h-auto w-14"
          src={require("./../images/logo.png")}
          alt="logo"
        ></img>
        <h1 className="items-center p-0 text-xl">Dịch</h1>
      </a>
    </header>
  );
}

export default Header;
