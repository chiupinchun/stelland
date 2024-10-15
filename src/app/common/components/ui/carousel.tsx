import { FC, useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { twMerge } from 'tailwind-merge';

const DENY_AUTO_PLAY_DURATION = 3000

interface Props {
  children: React.ReactNode[]
  index?: number
  interval?: number | null;
  onChange?: (currentIndex: number) => void
  className?: string
}

const Carousel: FC<Props> = ({
  children, interval = 3000, index = 0, className = '',
  onChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(index);

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
    setCurrentIndex(index)
    denyAutoPlay()
  }, [index])

  useEffect(() => {
    let autoPlay: ReturnType<typeof setInterval>
    if (typeof interval === 'number') {
      autoPlay = setInterval(() => {
        if (isAutoPlay) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
        }
      }, interval);
    }

    return () => {
      if (typeof autoPlay === 'number') {
        clearInterval(autoPlay)
      }
    }
  }, [children.length, interval, isAutoPlay]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
    denyAutoPlay()
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
    denyAutoPlay()
  };

  return (
    <div className={twMerge(
      'relative w-full max-w-[100vw] mx-auto overflow-hidden',
      className
    )}>
      <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {children.map((child, index) => (
          <div key={index} className="w-full max-w-[100vw] h-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-700 bg-opacity-50 text-white p-2 z-10"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-700 bg-opacity-50 text-white p-2 z-10"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
