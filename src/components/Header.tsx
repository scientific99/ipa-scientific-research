import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="fixed w-screen bg-white px-8 py-3 z-10 top-0 left-0 right-0 border-b border-solid border-gray-300">
      <Link to="/home" className="flex items-center justify-end">
        {/* <h1 className="flex items-center text-lg text-[#1967d2] font-momo">Phiên âm</h1> */}
        <img
          className="h-9 w-auto"
          src={require("./../images/logo.png")}
          alt="logo"
        />
      </Link>
    </div>
  );
}

export default Header;
