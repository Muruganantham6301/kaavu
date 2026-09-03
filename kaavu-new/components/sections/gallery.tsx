'use client';

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';

// Memoized slide component with hover overlay
const SlideImage = memo(({ src, alt, onClick, className }: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  };
  
  return (
    <div
      className={`${className} relative overflow-hidden rounded-lg bg-gray-900 group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className={`object-cover pointer-events-none transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        draggable={false}
        loading="lazy"
        quality={85}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      
      {/* Hover Overlay with Icon */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={handleIconClick}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-all transform hover:scale-110 cursor-pointer z-10"
          aria-label="Open image"
        >
          <svg 
            className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
});

SlideImage.displayName = 'SlideImage';

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Image data
  const slides = [
    [
      { src: '/images/gallery/cake.jpg', alt: 'Cake' },
      { src: '/images/gallery/food.jpg', alt: 'Food' },
      { src: '/images/gallery/yoga.jpg', alt: 'Yoga' },
      { src: '/images/gallery/dish.jpg', alt: 'Dish' },
    ],
    [
      { src: '/images/gallery/hut.jpg', alt: 'Hut' },
      { src: '/images/gallery/music.jpg', alt: 'Elegant dining' },
      { src: '/images/gallery/review.jpg', alt: 'Review' },
      { src: '/images/zones/bristo.jpg', alt: 'Bristo' },
      { src: '/images/zones/cafe.jpg', alt: 'Cafe' },
    ],
    [
      { src: '/images/zones/cavern.jpg', alt: 'Cavern' },
      { src: '/images/zones/cicada.jpg', alt: 'Cicada' },
      { src: '/images/zones/forest.jpg', alt: 'Forest' },
      { src: '/images/zones/grove.jpg', alt: 'Grove' },
      { src: '/images/zones/stonehenge.jpg', alt: 'Stonehenge' },
    ],
  ];

  const allImages = slides.flat();

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragDistance(0);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const distance = Math.abs(x - startX);
    setDragDistance(distance);
    const walk = (x - startX) * 1.5;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => setDragDistance(0), 100);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setDragDistance(0);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const distance = Math.abs(x - startX);
    setDragDistance(distance);
    const walk = (x - startX) * 1.5;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [isDragging, startX, scrollLeft]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => setDragDistance(0), 100);
  }, []);

  // Lightbox handlers
  const openLightbox = useCallback((slideIndex: number, imageIndex: number) => {
    // Don't open if user was dragging
    if (dragDistance > 10) return;
    
    const globalIndex = slides.slice(0, slideIndex).reduce((acc, slide) => acc + slide.length, 0) + imageIndex;
    setCurrentLightboxIndex(globalIndex);
    setLightboxOpen(true);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  }, [slides, dragDistance]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    document.body.style.overflow = 'auto';
  }, []);

  const lightboxNav = useCallback((direction: number) => {
    let newIndex = currentLightboxIndex + direction;
    if (newIndex < 0) newIndex = allImages.length - 1;
    if (newIndex >= allImages.length) newIndex = 0;
    setCurrentLightboxIndex(newIndex);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, [currentLightboxIndex, allImages.length]);

  // Zoom handlers
  const zoomIn = useCallback(() => setZoomLevel(prev => Math.min(prev + 0.5, 4)), []);
  const zoomOut = useCallback(() => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setImagePosition({ x: 0, y: 0 });
      return newZoom;
    });
  }, []);
  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, []);

  // Pan handlers
  const handleImageMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      e.preventDefault();
      setIsPanning(true);
      setPanStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  }, [zoomLevel, imagePosition]);

  const handleImageMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  }, [isPanning, zoomLevel, panStart]);

  const handleImageMouseUp = useCallback(() => setIsPanning(false), []);

  const handleImageTouchStart = useCallback((e: React.TouchEvent) => {
    if (zoomLevel > 1) {
      setIsPanning(true);
      setPanStart({ 
        x: e.touches[0].clientX - imagePosition.x, 
        y: e.touches[0].clientY - imagePosition.y 
      });
    }
  }, [zoomLevel, imagePosition]);

  const handleImageTouchMove = useCallback((e: React.TouchEvent) => {
    if (isPanning && zoomLevel > 1) {
      e.preventDefault();
      setImagePosition({
        x: e.touches[0].clientX - panStart.x,
        y: e.touches[0].clientY - panStart.y
      });
    }
  }, [isPanning, zoomLevel, panStart]);

  const handleImageTouchEnd = useCallback(() => setIsPanning(false), []);

  // Download handler
  const handleDownload = useCallback(async () => {
    const imageUrl = allImages[currentLightboxIndex].src;
    const imageName = allImages[currentLightboxIndex].alt.replace(/\s+/g, '-').toLowerCase();
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${imageName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      window.open(imageUrl, '_blank');
    }
  }, [allImages, currentLightboxIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') lightboxNav(-1);
      if (e.key === 'ArrowRight') lightboxNav(1);
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxNav, closeLightbox, zoomIn, zoomOut, resetZoom]);

  // Swipe handlers for lightbox
  const minSwipeDistance = 50;

  const onTouchStartLightbox = useCallback((e: React.TouchEvent) => {
    if (zoomLevel > 1) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, [zoomLevel]);

  const onTouchMoveLightbox = useCallback((e: React.TouchEvent) => {
    if (zoomLevel > 1) return;
    setTouchEnd(e.targetTouches[0].clientX);
  }, [zoomLevel]);

  const onTouchEndLightbox = useCallback(() => {
    if (zoomLevel > 1 || !touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) lightboxNav(1);
    if (distance < -minSwipeDistance) lightboxNav(-1);
  }, [zoomLevel, touchStart, touchEnd, lightboxNav]);

  return (
    <div className="max-w-full mx-auto pb-16 md:pb-20 lg:pb-24 scroll-mt-10" id='gallery'>
      {/* Title */}
      <div className='mb-12 md:mb-16'>
        <h2 className="font-serif tracking-normal text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-4 max-w-4xl text-black mx-auto text-center">
          Spaces designed for<br />gathering, pause, and celebration
        </h2>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-2 md:gap-4 px-6 md:px-16 select-none" style={{ width: 'max-content' }}>
          {/* Slide 1 */}
          <div className="w-[85vw] sm:w-[90vw] md:w-[1000px] lg:w-[1200px] flex-shrink-0 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] grid grid-cols-4 grid-rows-2 gap-2 md:gap-4">
            <SlideImage src={slides[0][0].src} alt={slides[0][0].alt} onClick={() => openLightbox(0, 0)} className="row-span-2 col-span-2" />
            <SlideImage src={slides[0][1].src} alt={slides[0][1].alt} onClick={() => openLightbox(0, 1)} className="row-span-1 col-span-2" />
            <SlideImage src={slides[0][2].src} alt={slides[0][2].alt} onClick={() => openLightbox(0, 2)} className="row-span-1 col-span-1" />
            <SlideImage src={slides[0][3].src} alt={slides[0][3].alt} onClick={() => openLightbox(0, 3)} className="row-span-1 col-span-1" />
          </div>

          {/* Slide 2 */}
          <div className="w-[85vw] sm:w-[90vw] md:w-[1000px] lg:w-[1200px] flex-shrink-0 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] grid grid-cols-3 grid-rows-3 gap-2 md:gap-4">
            <SlideImage src={slides[1][0].src} alt={slides[1][0].alt} onClick={() => openLightbox(1, 0)} className="row-span-2 col-span-1" />
            <SlideImage src={slides[1][1].src} alt={slides[1][1].alt} onClick={() => openLightbox(1, 1)} className="row-span-2 col-span-1" />
            <SlideImage src={slides[1][2].src} alt={slides[1][2].alt} onClick={() => openLightbox(1, 2)} className="row-span-2 col-span-1" />
            <SlideImage src={slides[1][3].src} alt={slides[1][3].alt} onClick={() => openLightbox(1, 3)} className="row-span-1 col-span-2" />
            <SlideImage src={slides[1][4].src} alt={slides[1][4].alt} onClick={() => openLightbox(1, 4)} className="row-span-1 col-span-1" />
          </div>

          {/* Slide 3 */}
          <div className="w-[85vw] sm:w-[90vw] md:w-[1000px] lg:w-[1200px] flex-shrink-0 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] grid grid-cols-3 grid-rows-3 gap-2 md:gap-4">
            <SlideImage src={slides[2][0].src} alt={slides[2][0].alt} onClick={() => openLightbox(2, 0)} className="row-span-2 col-span-2" />
            <SlideImage src={slides[2][1].src} alt={slides[2][1].alt} onClick={() => openLightbox(2, 1)} className="row-span-1 col-span-1" />
            <SlideImage src={slides[2][2].src} alt={slides[2][2].alt} onClick={() => openLightbox(2, 2)} className="row-span-1 col-span-1" />
            <SlideImage src={slides[2][3].src} alt={slides[2][3].alt} onClick={() => openLightbox(2, 3)} className="row-span-1 col-span-1" />
            <SlideImage src={slides[2][4].src} alt={slides[2][4].alt} onClick={() => openLightbox(2, 4)} className="row-span-1 col-span-2" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center items-center gap-2 mt-4 md:mt-8 text-gray-500">
        <svg className="w-4 h-4 md:w-5 md:h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span className="text-xs md:text-sm">Scroll or drag to explore</span>
        <svg className="w-4 h-4 md:w-5 md:h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      {/* Lightbox - Only render when open */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[1000] flex flex-col"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Top Toolbar */}
          <div className="flex-shrink-0 h-14 md:h-16 bg-gradient-to-b from-black/80 to-transparent z-[1002] flex items-center justify-between px-3 md:px-8">
            <div className="text-white/90 text-xs md:text-sm font-medium">
              {currentLightboxIndex + 1} / {allImages.length}
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              {/* Zoom controls */}
              <div className="hidden sm:flex items-center bg-white/10 backdrop-blur-sm rounded-full p-0.5 md:p-1">
                <button
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 rounded-full transition-all disabled:opacity-40"
                  onClick={zoomOut}
                  disabled={zoomLevel <= 1}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  </svg>
                </button>
                <span className="text-white/90 text-xs md:text-sm min-w-[40px] md:min-w-[50px] text-center font-medium">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 rounded-full transition-all disabled:opacity-40"
                  onClick={zoomIn}
                  disabled={zoomLevel >= 4}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </button>
              </div>

              {/* Mobile Zoom */}
              <div className="flex sm:hidden items-center gap-1">
                <button
                  className="w-8 h-8 flex items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all disabled:opacity-40"
                  onClick={zoomOut}
                  disabled={zoomLevel <= 1}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all disabled:opacity-40"
                  onClick={zoomIn}
                  disabled={zoomLevel >= 4}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {zoomLevel > 1 && (
                <button
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
                  onClick={resetZoom}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              )}

              <button
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
                onClick={handleDownload}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>

              <button
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
                onClick={closeLightbox}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image Area */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
            <button
              className="hidden md:flex absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm w-10 h-10 lg:w-12 lg:h-12 rounded-full text-white/90 hover:text-white items-center justify-center transition-all z-[1001]"
              onClick={(e) => {
                e.stopPropagation();
                lightboxNav(-1);
              }}
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div 
              ref={imageContainerRef}
              className="w-full h-full flex items-center justify-center px-2 md:px-20"
              style={{ cursor: zoomLevel > 1 ? (isPanning ? 'grabbing' : 'grab') : 'default' }}
              onMouseDown={handleImageMouseDown}
              onMouseMove={handleImageMouseMove}
              onMouseUp={handleImageMouseUp}
              onMouseLeave={handleImageMouseUp}
              onTouchStart={zoomLevel > 1 ? handleImageTouchStart : onTouchStartLightbox}
              onTouchMove={zoomLevel > 1 ? handleImageTouchMove : onTouchMoveLightbox}
              onTouchEnd={zoomLevel > 1 ? handleImageTouchEnd : onTouchEndLightbox}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allImages[currentLightboxIndex].src}
                alt={allImages[currentLightboxIndex].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full w-auto h-auto object-contain select-none"
                style={{
                  transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                  transition: isPanning ? 'none' : 'transform 0.2s ease-out',
                }}
                draggable={false}
                priority
                quality={90}
              />
            </div>

            <button
              className="hidden md:flex absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm w-10 h-10 lg:w-12 lg:h-12 rounded-full text-white/90 hover:text-white items-center justify-center transition-all z-[1001]"
              onClick={(e) => {
                e.stopPropagation();
                lightboxNav(1);
              }}
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="flex-shrink-0 h-14 md:h-16 bg-gradient-to-t from-black/80 to-transparent z-[1001] flex flex-col items-center justify-center px-4">
            <p className="text-white/90 text-xs md:text-sm font-medium text-center truncate max-w-full">
              {allImages[currentLightboxIndex].alt}
            </p>
            <p className="md:hidden text-white/50 text-[10px] mt-1">
              Swipe left or right to navigate
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Gallery;