import Hero from '../../components/Hero/Hero';
import BestsellerProducts from '../../components/BestsellerProducts/BestsellerProducts';
import BestServices from '../../components/BestServices/BestServices';
import FeaturedPosts from '../../components/FeaturedPosts/FeaturedPosts';
import Testimonials from '../../components/Testimonials/Testimonials';
import CtaBanner from '../../components/CtaBanner/CtaBanner';

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <BestsellerProducts />
      <BestServices />
      <FeaturedPosts />
      <Testimonials />
      <CtaBanner />
    </main>
  );
}
