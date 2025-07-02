import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const offers = [
  {
    title: "🏝️ Summer Escape",
    description: "Up to 40% off on Maldives packages.",
    image: "/images/hotel1.jpg",
  },
  {
    title: "✈️ International Deals",
    description: "Flat 20% off on flights to Europe.",
    image: "/images/hotel2.jpg",
  },
  {
    title: "🧳 Group Discounts",
    description: "Book for 4+ people and save big.",
    image: "/images/hotel3.jpg",
  },
  {
    title: "🔥 Flash Sale",
    description: "Last-minute deals for domestic travel.",
    image: "/images/hotel4.jpg",
  },
  {
    title: "🧳 Group Discounts",
    description: "Book for 4+ people and save big.",
    image: "/images/hotel1.jpg",
  },
  {
    title: "🔥 Flash Sale",
    description: "Last-minute deals for domestic travel.",
    image: "/images/hotel6.jpg",
  },
];

export default function HotelCarousel() {
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
        modules={[Navigation, Pagination]}
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
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {offers.map((offer, index) => (
          <SwiperSlide key={index} className="py-8">
            <div className="relative group rounded-xl overflow-hidden shadow border border-[#5c745c] h-64">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center p-4">
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-sm">{offer.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
