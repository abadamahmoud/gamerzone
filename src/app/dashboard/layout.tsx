import Header from "@/components/Header";
import SideNav from "@/components/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
        <SideNav />
        <Header/>
      <div className="w-full md:overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
