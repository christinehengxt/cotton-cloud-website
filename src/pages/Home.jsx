import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Philosophy from '../components/Philosophy';
import Products from '../components/Products';
import About from '../components/About';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Philosophy />
      <Products />
      <About />
      <Newsletter />
    </>
  );
}
