import Link from "next/link"


function Logo() {
  return (
    <Link
    href={"/"}
    className="py-2 my-1.5 font-bold px-2 text-3xl border border-  w-full justify-center  md:flex hidden"
    >
      <span className="lg:block hidden">Gamerzone</span>
      <span className="md:inline lg:hidden ">G</span>
    </Link>
  )
}

export default Logo