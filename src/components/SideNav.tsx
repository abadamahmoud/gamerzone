import Logo from "./Logo"
import NavLinks from "./NavLinks"

function SideNav() {
  return (
    <div className="flex flex-col h-full px-3   py-4 md:px-2 ">
      <div className="-ml-3 md:ml-0 md:mr-0  h-16 justify-evenly md:justify-start
      fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-8 items-center md:items-start p-2">
        <Logo/>
        <NavLinks/>
        {/* user && <ProfileLInk/> */}
        <div>
          {/* <MoreDropdown/> */}
        </div>
      </div>
    </div>

  )
}

export default SideNav