import { Hero } from "./components/Hero";
import { Reccomendations } from "./components/Reccomendations";
import { TopAnime } from "./components/TopAnime";

export default function Home() {
  return (
    <main>
      <Hero />
      <Reccomendations />
      <TopAnime />
    </main>
  );
}
