interface CarouselBulletsType {
  totalCarousels: number[];
  bulletsWrapperClasses: string;
  onScroll: (i: number) => void;
  currentCarousel?: number;
}
export default function CarouselBullets({
  bulletsWrapperClasses,
  totalCarousels,
  onScroll,
  currentCarousel = 0,
}: CarouselBulletsType) {
  return (
    <div className={bulletsWrapperClasses}>
      {totalCarousels.map((_, index) => (
        <button
          key={index}
          onClick={() => onScroll(index)}
          className={`h-2.5 w-2.5 rounded-full transition-all duration-300 cursor-pointer hover:bg-slate-500 ${
            index === currentCarousel
              ? "bg-gray-500 scale-110 shadow-[0_0_0_3px_rgba(0,0,0,0.2)]"
              : "bg-gray-300 shadow-none"
          }`}
        ></button>
      ))}
    </div>
  );
}
