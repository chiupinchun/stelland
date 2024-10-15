import { FC, useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

const DENY_AUTO_PLAY_DURATION = 3000

interface Props {
  images: string[];
  initialIndex?: number
  interval?: number | null;
  onChange?: (currentIndex: number) => void
}

const Carousel: FC<Props> = ({
  images, interval = 3000, initialIndex = 0,
  onChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    onChange?.(currentIndex)
  }, [currentIndex])

  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const cancelDenyAutoPlay = useDebounce(
    () => setIsAutoPlay(true),
    DENY_AUTO_PLAY_DURATION
  )
  const denyAutoPlay = () => {
    setIsAutoPlay(false)
    cancelDenyAutoPlay()
  }

  useEffect(() => {
    let autoPlay: ReturnType<typeof setInterval>
    if (typeof interval === 'number') {
      autoPlay = setInterval(() => {
        if (isAutoPlay) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
      }, interval);
    }

    return () => {
      if (typeof autoPlay === 'number') {
        clearInterval(autoPlay)
      }
    }
  }, [images.length, interval, isAutoPlay]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    denyAutoPlay()
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    denyAutoPlay()
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img src={image} alt={`Slide ${index}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 z-10"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 z-10"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
