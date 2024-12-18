import React from "react";
import Logo from "../assets/logo.svg";
import Navigate from "../assets/link.svg";
import React, { lazy, Suspense } from "react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar visibility

  const handleBrochureClick = () => {
    window.open("https://drive.google.com/file/d/your-file-id/view?usp=sharing", "_blank");
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <header className="w-full">
      <nav className="flex justify-between items-center py-4 px-8 lg:py-8 lg:px-[120px]">

        <Suspense fallback={<div>Loading...</div>}>
          <a href="/">
            <Logo className="h-8 w-auto" alt="logo" />
          </a>
        </Suspense>
        
        <div className="flex gap-4 items-center">
          <div
            className="flex items-center gap-2 cursor-pointer px-4 group"
            onClick={handleBrochureClick}
          >
            <span className="h-[20px] w-1 bg-[#3AFFA3] z-10"></span>
            <span
              className="h-4 w-1 bg-[#3AFFA3] absolute -translate-x-1/2"
              style={{
                animation: "growBlur 1400ms infinite",
                opacity: 1,
              }}
            ></span>
            <p>Brochure</p>
            <img
              src={Navigate}
              alt="brochure"
              className="group-hover:rotate-[45deg] transition duration-500"
            />
          </div>
          <button 
            className="flex items-center gap-[10px] border border-[rgba(255,255,255,0.5)] pl-6 pr-4 py-[10px] rounded group"
            onClick={toggleSidebar} // Toggle sidebar on button click
          >
            <p>Menu</p>
            <img
              src={Navigate}
              alt="menu"
              className="group-hover:rotate-[45deg] transition duration-500"
            />
          </button>
        </div>
      </nav>

      {/* Render Sidebar when open */}
      {isSidebarOpen && <Sidebar closeSidebar={toggleSidebar} />}
    </header>
  );
};

export default Navbar;
