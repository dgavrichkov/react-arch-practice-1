import { Outlet } from "react-router-dom";
import { NavBar } from "./layout/NavBar";

export function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
