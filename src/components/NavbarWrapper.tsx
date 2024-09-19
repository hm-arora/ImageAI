import Navbar from "./Navbar";

export const NavbarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col h-dvh border-collapse overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </>
  );
};
