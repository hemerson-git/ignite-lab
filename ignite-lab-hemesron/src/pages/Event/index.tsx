import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Video } from "../../components/Video";

export function Event() {
  const { slug } = useParams<{ slug: string }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const deviceWidth = innerWidth;

  function handleToggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="page_event flex flex-col min-h-screen">
      <Header isOpen={isMenuOpen} setIsOpen={handleToggleMenu} />

      <main className="flex flex-1">
        {slug ? (
          <Video lessonSlug={slug} />
        ) : (
          <div className="flex-1 bg-black"></div>
        )}

        {(isMenuOpen || deviceWidth > 400) && <Sidebar />}
      </main>
    </div>
  );
}
