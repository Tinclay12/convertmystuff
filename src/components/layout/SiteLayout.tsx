import { Footer } from "./Footer";
import { Header } from "./Header";

type AppShellProps = {
  children: React.ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export const SiteLayout = AppShell;
