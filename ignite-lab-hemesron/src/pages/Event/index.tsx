import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Video } from "../../components/Video";

export function Event() {
  return (
    <div className="page_event flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-1">
        <Video />
        <Sidebar />
      </main>
    </div>
  );
}
