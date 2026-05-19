import Banner from "@/components/home/Banner";
import Featured from "@/components/home/Featured";
import WhyChoseUs from "@/components/home/WhyChoseUs";
import WorkSection from "@/components/home/WorkSection";


export default function Home() {
  return (
    <div>
      <Banner />
      <Featured />
      <WorkSection />
      <WhyChoseUs />
    </div>
  );
}
