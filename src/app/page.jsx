import Banner from "@/components/Banner";
import Schedules from "@/app/Schedules";
import Recommendation from "@/app/Recommendation";
import TopAnime from "@/app/TopAnime";

const date = new Date();
const fullDay = date.toLocaleDateString("en-US", { weekday: "long" });

const Page = () => {
  return (
    <main className="container flex flex-col gap-14">
      <Banner />

      <section className="flex flex-col gap-7 xl:flex-row">
        <div className="flex flex-col gap-7">
          <TopAnime />
          <Recommendation />
        </div>

        <Schedules day={fullDay} />
      </section>
    </main>
  );
};
export default Page;
