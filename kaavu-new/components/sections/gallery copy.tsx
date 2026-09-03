'use client'

import * as React from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const galleryImages = [
  {
    src: '/images/gallery/image1.jpg',
    alt: 'Restaurant interior with wooden beams and ambient lighting',
  },
  {
    src: '/images/gallery/image2.jpg',
    alt: 'Modern dining space with elegant setup',
  },
  {
    src: '/images/gallery/image3.jpg',
    alt: 'Outdoor garden venue with string lights',
  },
  {
    src: '/images/gallery/image4.jpg',
    alt: 'Wedding reception setup with floral decorations',
  },
  {
    src: '/images/gallery/image5.jpg',
    alt: 'Event space with celebration setup',
  },
]

const CARD_WIDTH = 55
const GAP_PERCENT = 2.5

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [translateX, setTranslateX] = React.useState(0)
  const [shouldAnimate, setShouldAnimate] = React.useState(true)
  
  const extendedImages = React.useMemo(() => {
    return [...galleryImages, galleryImages[0], galleryImages[1]]
  }, [])

  const slideWidth = CARD_WIDTH + GAP_PERCENT

  React.useEffect(() => {
    setTranslateX(currentIndex * slideWidth)
  }, [currentIndex, slideWidth])

  const goToSlide = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setShouldAnimate(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 700)
  }

  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setShouldAnimate(true)
    
    if (currentIndex === 0) {
      setShouldAnimate(false)
      setTranslateX(galleryImages.length * slideWidth)
      setCurrentIndex(galleryImages.length)
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldAnimate(true)
          setCurrentIndex(galleryImages.length - 1)
          setTranslateX((galleryImages.length - 1) * slideWidth)
          setTimeout(() => setIsAnimating(false), 700)
        })
      })
    } else {
      setCurrentIndex(currentIndex - 1)
      setTimeout(() => setIsAnimating(false), 700)
    }
  }

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setShouldAnimate(true)
    
    const newIndex = currentIndex + 1
    setCurrentIndex(newIndex)
    setTranslateX(newIndex * slideWidth)
    
    if (newIndex >= galleryImages.length) {
      setTimeout(() => {
        setShouldAnimate(false)
        setCurrentIndex(newIndex - galleryImages.length)
        setTranslateX((newIndex - galleryImages.length) * slideWidth)
        requestAnimationFrame(() => {
          setShouldAnimate(true)
          setIsAnimating(false)
        })
      }, 700)
    } else {
      setTimeout(() => setIsAnimating(false), 700)
    }
  }

  const actualIndex = currentIndex >= galleryImages.length ? currentIndex - galleryImages.length : currentIndex

  return (
    <section id="gallery" className="py-12 md:py-16 overflow-hidden scroll-mt-10">
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Text content */}
        <div className="px-6 md:px-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12 lg:w-[35%] flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light mb-4 max-w-2xl mx-auto">
              Gallery
            </h2>
            <p className="text-black text-base md:text-lg">
              See URU through the moments that matter most
            </p>
          </div>
        </div>

        {/* Right side - Image carousel */}
        <div className="lg:w-[65%] mt-8 lg:mt-0">
          <div className="relative overflow-hidden pl-6 md:pl-0">
            {/* Left edge fade - hidden on mobile */}
            <div className="hidden md:block absolute top-0 left-0 w-5 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            
            {/* Images container */}
            <div 
              className={cn(
                "flex",
                shouldAnimate && "transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
              )}
              style={{
                gap: `${GAP_PERCENT}%`,
                transform: `translateX(-${translateX}%)`,
              }}
            >
              {extendedImages.map((image, idx) => (
                <div
                  key={idx}
                  className="relative flex-shrink-0 rounded-xl overflow-hidden"
                  style={{ width: `${CARD_WIDTH}%` }}
                >
                  <div className="aspect-[4/3] overflow-hidden group">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 70vw, 35vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 px-6 md:pr-8 md:pl-0">
            {/* Arrow buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevious}
                className="w-10 h-10 border border-primary/30 rounded-sm flex items-center justify-center hover:bg-primary/10 transition-colors bg-transparent"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={goToNext}
                className="w-10 h-10 border border-primary/30 rounded-sm flex items-center justify-center hover:bg-primary/10 transition-colors bg-transparent"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all duration-300',
                    index === actualIndex ? 'bg-primary' : 'bg-primary/30'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}