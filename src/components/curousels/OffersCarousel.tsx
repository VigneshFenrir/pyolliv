import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const offers = [
  {
    title: "🏝️ Maldives Magic",
    description:
      "Save Up to 40% on dreamy island getaways! Soak in turquoise waters, white sands, and luxury like never before.",
    image: "/images/offers.jpg",
  },
  {
    title: "✈️ Euro Flight Fest",
    description:
      "Flat 20% Off on all flights to Europe! Your European adventure just got a whole lot cheaper.",
    image: "/images/offer2.jpg",
  },
  {
    title: "🧳 Squad Saver",
    description:
      "Big Discounts for groups of 4 or more! More friends, more fun — and more savings.",
    image: "/images/offer3.jpg",
  },
  {
    title: "🔥 Flash Fare Frenzy",
    description:
      "Limited-Time Domestic Deals! Grab last-minute travel offers before they’re gone.",
    image: "/images/offer2.jpg",
  },
];

export default function OffersCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full relative ">
      {/* Custom Navigation Buttons */}
      <div
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#A9B388] hover:bg-[#90a575] rounded-full cursor-pointer transition"
      >
        <ChevronLeft className="text-white w-5 h-5" />
      </div>
      <div
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#A9B388] hover:bg-[#90a575] rounded-full cursor-pointer transition"
      >
        <ChevronRight className="text-white w-5 h-5" />
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {offers.map((offer, index) => (
          <SwiperSlide key={index} className="py-8 h-full">
            <div className="flex flex-col h-full gap-3 px-2 py-2 border bg-amber-50 rounded shadow">
              {/* Image Section */}
              <div className="relative group rounded overflow-hidden border border-[#5c745c] h-64 rounded-tl-3xl rounded-br-3xl">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Text Section */}
              <div className="flex flex-col justify-between flex-1 px-4 pb-4">
                <p className="text-lg font-semibold text-black">
                  {offer.title}
                </p>
                <p className="text-gray-600 font-medium">{offer.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
