import { CinematicProvider } from '@/context/CinematicContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrollIndicator from '@/components/ScrollIndicator';
import BrandCredentials from '@/sections/BrandCredentials';
import MissionDebrief from '@/sections/MissionDebrief';
import CareerRecord from '@/sections/CareerRecord';
import StrategicIntel from '@/sections/StrategicIntel';
import Contact from '@/sections/Contact';

export default function App() {
  return (
    <CinematicProvider>
      <div className="relative w-full bg-[#07090B]">
        <Navbar />
        <main>
          <Hero />
          <BrandCredentials />
          <MissionDebrief />
          <CareerRecord />
          <StrategicIntel />
          <Contact />
        </main>
        <ScrollIndicator />
      </div>
    </CinematicProvider>
  );
}
