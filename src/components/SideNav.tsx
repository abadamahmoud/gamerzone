
import NavLinks from "./NavLinks";
import Footer from "./Footer";



const  SideNav = () => {
  


  return (
    <div className="flex h-full flex-col w-20 flex-none lg:w-52 md:border-r px-3 py-4 md:px-2">
      <div className="border-t -ml-3 md:ml-0 md:pt-20 bg-white dark:bg-neutral-950 h-16 justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 p-2">
        <NavLinks />
        
        <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
