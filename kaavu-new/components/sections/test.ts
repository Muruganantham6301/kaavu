'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Image data for all slides
  const slides = [
    // Slide 1 - 4 images
    [
      { src: '/images/gallery/cake.jpg', alt: 'Cake' },
      { src: '/images/gallery/food.jpg', alt: 'Food' },
      { src: '/images/gallery/yoga.jpg', alt: 'Yoga' },
      { src: '/images/gallery/dish.jpg', alt: 'Dish' },
    ],
    // Slide 2 - 5 images
    [
      { src: '/images/gallery/hut.jpg', alt: 'Hut' },
      { src: '/images/gallery/music.jpg', alt: 'Elegant dining' },
      { src: '/images/gallery/review.jpg', alt: 'Review' },
      { src: '/images/zones/bristo.jpg', alt: 'Bristo' },
      { src: '/images/zones/cafe.jpg', alt: 'Cafe' },
    ],
    // Slide 3 - 5 images
    [
      { src: '/images/zones/cavern.jpg', alt: 'Cavern' },
      { src: '/images/zones/cicada.jpg', alt: 'Cicada' },
      { src: '/images/zones/forest.jpg', alt: 'Forest' },
      { src: '/images/zones/grove.jpg', alt: 'Grove' },
      { src: '/images/zones/stonehenge.jpg', alt: 'Stonehenge' },
    ],
  ];

  // Flatten all images for lightbox
  const allImages = slides.flat();

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Lightbox handlers
  const openLightbox = (slideIndex: number, imageIndex: number) => {
    const globalIndex = slides.slice(0, slideIndex).reduce((acc, slide) => acc + slide.length, 0) + imageIndex;
    setCurrentLightboxIndex(globalIndex);
    setLightboxOpen(true);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    setShowShareMenu(false);
    document.body.style.overflow = 'auto';
  };

  const lightboxNav = (direction: number) => {
    let newIndex = currentLightboxIndex + direction;
    if (newIndex < 0) newIndex = allImages.length - 1;
    if (newIndex >= allImages.length) newIndex = 0;
    setCurrentLightboxIndex(newIndex);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  // Zoom handlers
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  };

  const zoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setImagePosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  // Pan handlers for zoomed image
  const handleImageMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      e.preventDefault();
      setIsPanning(true);
      setPanStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleImageMouseMove = (e: React.MouseEvent) => {
    if (isPanning && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };

  const handleImageMouseUp = () => {
    setIsPanning(false);
  };

  // Touch pan handlers for mobile
  const handleImageTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel > 1) {
      setIsPanning(true);
      setPanStart({ 
        x: e.touches[0].clientX - imagePosition.x, 
        y: e.touches[0].clientY - imagePosition.y 
      });
    }
  };

  const handleImageTouchMove = (e: React.TouchEvent) => {
    if (isPanning && zoomLevel > 1) {
      e.preventDefault();
      setImagePosition({
        x: e.touches[0].clientX - panStart.x,
        y: e.touches[0].clientY - panStart.y
      });
    }
  };

  const handleImageTouchEnd = () => {
    setIsPanning(false);
  };

  // Download handler
  const handleDownload = async () => {
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
  };

  // Share handlers
  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const shareToTwitter = () => {
    const url = allImages[currentLightboxIndex].src;
    const text = `Check out this image: ${allImages[currentLightboxIndex].alt}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    setShowShareMenu(false);
  };

  const shareToFacebook = () => {
    const url = allImages[currentLightboxIndex].src;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    setShowShareMenu(false);
  };

  const shareToLinkedIn = () => {
    const url = allImages[currentLightboxIndex].src;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    setShowShareMenu(false);
  };

  const copyLink = async () => {
    const url = allImages[currentLightboxIndex].src;
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
    setShowShareMenu(false);
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: allImages[currentLightboxIndex].alt,
          text: `Check out this image: ${allImages[currentLightboxIndex].alt}`,
          url: allImages[currentLightboxIndex].src,
        });
      } catch (error) {
        // User cancelled or error
      }
    }
    setShowShareMenu(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') lightboxNav(-1);
        if (e.key === 'ArrowRight') lightboxNav(1);
        if (e.key === 'Escape') closeLightbox();
        if (e.key === '+' || e.key === '=') zoomIn();
        if (e.key === '-') zoomOut();
        if (e.key === '0') resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentLightboxIndex]);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showShareMenu) setShowShareMenu(false);
    };
    
    if (showShareMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showShareMenu]);

  // Swipe handlers for lightbox navigation on mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStartLightbox = (e: React.TouchEvent) => {
    if (zoomLevel > 1) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMoveLightbox = (e: React.TouchEvent) => {
    if (zoomLevel > 1) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndLightbox = () => {
    if (zoomLevel > 1) return;
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      lightboxNav(1);
    }
    if (isRightSwipe) {
      lightboxNav(-1);
    }
  };

  return (
    <div className="max-w-full mx-auto py-6 md:py-10">
      {/* Title - Responsive */}
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-12 text-gray-800 leading-tight font-serif px-4 md:px-5">
        Spaces designed for<br />gathering, pause, and celebration
      </h1>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-4 md:gap-8 px-4 md:px-16 select-none" style={{ width: 'max-content' }}>
          {/* Slide 1 - Asymmetric Grid - Mobile Responsive */}
          <div className="w-[85vw] sm:w-[90vw] md:w-[1000px] lg:w-[1200px] flex-shrink-0 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] grid grid-cols-4 grid-rows-2 gap-2 md:gap-4">
            <div
              className="row-span-2 col-span-2 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(0, 0)}
            >
              <Image src={slides[0][0].src} alt={slides[0][0].alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
            <div
              className="row-span-1 col-span-2 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(0, 1)}
            >
              <Image src={slides[0][1].src} alt={slides[0][1].alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
            <div
              className="row-span-1 col-span-1 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(0, 2)}
            >
              <Image src={slides[0][2].src} alt={slides[0][2].alt} fill sizes="(max-width: 768px) 25vw, 25vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
            <div
              className="row-span-1 col-span-1 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(0, 3)}
            >
              <Image src={slides[0][3].src} alt={slides[0][3].alt} fill sizes="(max-width: 768px) 25vw, 25vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
          </div>

          {/* Slide 2 - Vertical Emphasis - Mobile Responsive */}
          <div className="w-[85vw] sm:w-[90vw] md:w-[1000px] lg:w-[1200px] flex-shrink-0 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] grid grid-cols-3 grid-rows-3 gap-2 md:gap-4">
            <div
              className="row-span-2 col-span-1 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(1, 0)}
            >
              <Image src={slides[1][0].src} alt={slides[1][0].alt} fill sizes="(max-width: 768px) 33vw, 33vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
            <div
              className="row-span-2 col-span-1 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(1, 1)}
            >
              <Image src={slides[1][1].src} alt={slides[1][1].alt} fill sizes="(max-width: 768px) 33vw, 33vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
            <div
              className="row-span-2 col-span-1 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(1, 2)}
            >
              <Image src={slides[1][2].src} alt={slides[1][2].alt} fill sizes="(max-width: 768px) 33vw, 33vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
            <div
              className="row-span-1 col-span-2 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(1, 3)}
            >
              <Image src={slides[1][3].src} alt={slides[1][3].alt} fill sizes="(max-width: 768px) 66vw, 50vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
            <div
              className="row-span-1 col-span-1 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(1, 4)}
            >
              <Image src={slides[1][4].src} alt={slides[1][4].alt} fill sizes="(max-width: 768px) 33vw, 33vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
          </div>

          {/* Slide 3 - L-Shape Layout - Mobile Responsive */}
          <div className="w-[85vw] sm:w-[90vw] md:w-[1000px] lg:w-[1200px] flex-shrink-0 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] grid grid-cols-3 grid-rows-3 gap-2 md:gap-4">
            <div
              className="row-span-2 col-span-2 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(2, 0)}
            >
              <Image src={slides[2][0].src} alt={slides[2][0].alt} fill sizes="(max-width: 768px) 66vw, 50vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
            <div
              className="row-span-1 col-span-1 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(2, 1)}
            >
              <Image src={slides[2][1].src} alt={slides[2][1].alt} fill sizes="(max-width: 768px) 33vw, 33vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
            <div
              className="row-span-1 col-span-1 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(2, 2)}
            >
              <Image src={slides[2][2].src} alt={slides[2][2].alt} fill sizes="(max-width: 768px) 33vw, 33vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
            <div
              className="row-span-1 col-span-1 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(2, 3)}
            >
              <Image src={slides[2][3].src} alt={slides[2][3].alt} fill sizes="(max-width: 768px) 33vw, 33vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
            <div
              className="row-span-1 col-span-2 relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(2, 4)}
            >
              <Image src={slides[2][4].src} alt={slides[2][4].alt} fill sizes="(max-width: 768px) 66vw, 50vw" className="object-cover pointer-events-none" draggable={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Responsive */}
      <div className="flex justify-center items-center gap-2 mt-4 md:mt-8 text-gray-500">
        <svg className="w-4 h-4 md:w-5 md:h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span className="text-xs md:text-sm">Scroll or drag to explore</span>
        <svg className="w-4 h-4 md:w-5 md:h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      {/* Lightbox - Fully Responsive */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[1000] flex flex-col"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Top Toolbar - Mobile Optimized */}
          <div className="flex-shrink-0 h-14 md:h-16 bg-gradient-to-b from-black/80 to-transparent z-[1002] flex items-center justify-between px-3 md:px-8 safe-area-top">
            {/* Image Counter */}
            <div className="text-white/90 text-xs md:text-sm font-medium">
              {currentLightboxIndex + 1} / {allImages.length}
            </div>

            {/* Action Buttons - Responsive */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Zoom Controls - Hidden on very small screens, simplified on mobile */}
              <div className="hidden sm:flex items-center bg-white/10 backdrop-blur-sm rounded-full p-0.5 md:p-1">
                <button
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={zoomOut}
                  disabled={zoomLevel <= 1}
                  aria-label="Zoom out"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  </svg>
                </button>
                <span className="text-white/90 text-xs md:text-sm min-w-[40px] md:min-w-[50px] text-center font-medium">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={zoomIn}
                  disabled={zoomLevel >= 4}
                  aria-label="Zoom in"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </button>
              </div>

              {/* Mobile Zoom Buttons */}
              <div className="flex sm:hidden items-center gap-1">
                <button
                  className="w-8 h-8 flex items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all disabled:opacity-40"
                  onClick={zoomOut}
                  disabled={zoomLevel <= 1}
                  aria-label="Zoom out"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all disabled:opacity-40"
                  onClick={zoomIn}
                  disabled={zoomLevel >= 4}
                  aria-label="Zoom in"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Reset Zoom - Show only when zoomed */}
              {zoomLevel > 1 && (
                <button
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
                  onClick={resetZoom}
                  aria-label="Reset zoom"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              )}

              {/* Divider - Hidden on mobile */}
              <div className="hidden md:block w-px h-6 bg-white/20 mx-1"></div>

              {/* Share Button */}
              <div className="relative">
                <button
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare();
                  }}
                  aria-label="Share"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>

                {/* Share Menu Dropdown - Responsive positioning */}
                {showShareMenu && (
                  <div 
                    className="absolute top-10 md:top-12 right-0 bg-white rounded-xl shadow-2xl py-2 min-w-[180px] md:min-w-[200px] z-[1003] animate-fadeIn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {typeof navigator !== 'undefined' && navigator.share && (
                      <button
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 md:gap-3 transition-colors text-sm md:text-base"
                        onClick={nativeShare}
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Share...
                      </button>
                    )}
                    <button
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 md:gap-3 transition-colors text-sm md:text-base"
                      onClick={shareToTwitter}
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Share on X
                    </button>
                    <button
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 md:gap-3 transition-colors text-sm md:text-base"
                      onClick={shareToFacebook}
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Share on Facebook
                    </button>
                    <button
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 md:gap-3 transition-colors text-sm md:text-base"
                      onClick={shareToLinkedIn}
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      Share on LinkedIn
                    </button>
                    <div className="h-px bg-gray-200 my-1"></div>
                    <button
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 md:gap-3 transition-colors text-sm md:text-base"
                      onClick={copyLink}
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      {copySuccess ? 'Copied!' : 'Copy link'}
                    </button>
                  </div>
                )}
              </div>

              {/* Download Button */}
              <button
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
                onClick={handleDownload}
                aria-label="Download"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all ml-1"
                onClick={closeLightbox}
                aria-label="Close"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
            {/* Navigation - Previous (Hidden on mobile, use swipe instead) */}
            <button
              className="hidden md:flex absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full cursor-pointer text-white/90 hover:text-white items-center justify-center transition-all z-[1001]"
              onClick={(e) => {
                e.stopPropagation();
                lightboxNav(-1);
              }}
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image Container - Touch enabled for mobile swipe */}
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
              />
            </div>

            {/* Navigation - Next (Hidden on mobile, use swipe instead) */}
            <button
              className="hidden md:flex absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full cursor-pointer text-white/90 hover:text-white items-center justify-center transition-all z-[1001]"
              onClick={(e) => {
                e.stopPropagation();
                lightboxNav(1);
              }}
              aria-label="Next image"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Bar - Caption and Mobile Nav Hint */}
          <div className="flex-shrink-0 h-14 md:h-16 bg-gradient-to-t from-black/80 to-transparent z-[1001] flex flex-col items-center justify-center px-4 safe-area-bottom">
            <p className="text-white/90 text-xs md:text-sm font-medium text-center truncate max-w-full">
              {allImages[currentLightboxIndex].alt}
            </p>
            {/* Mobile swipe hint */}
            <p className="md:hidden text-white/50 text-[10px] mt-1">
              Swipe left or right to navigate
            </p>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .safe-area-top {
          padding-top: env(safe-area-inset-top);
        }
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
};

export default Gallery;