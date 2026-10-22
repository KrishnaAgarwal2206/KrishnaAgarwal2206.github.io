import SiteHeader from "../components/SiteHeader";
import ScrollFx, { SignalRail } from "../components/ScrollFx";
import { Hero, Metrics, Approach, SelectedWork } from "../components/SectionsA";
import { Secondary, Experience, About, Contact, Footer } from "../components/SectionsB";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <SignalRail />
      <main id="main">
        <Hero />
        <Metrics />
        <Approach />
        <SelectedWork />
        <Secondary />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollFx />
    </>
  );
}
