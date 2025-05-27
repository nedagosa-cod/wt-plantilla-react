import React, { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import slides from '@/data/noticias.json'
import { FullScreenImage } from './components/FullScreenImage'
import { SlideNavigation } from './components/SlideNavigation'

export const ImageSlider = ({ autoPlayInterval = 4000, className }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const slideTimerRef = useRef(null)

	const goToNextSlide = useCallback(() => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length)
	}, [slides.length])

	const goToPrevSlide = useCallback(() => {
		setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
	}, [slides.length])

	const openFullScreen = () => {
		setIsFullScreen(true)
	}

	const closeFullScreen = () => {
		setIsFullScreen(false)
	}

	// Handle auto-sliding
	useEffect(() => {
		if (isPaused) {
			if (slideTimerRef.current) {
				clearInterval(slideTimerRef.current)
				slideTimerRef.current = null
			}
			return
		}

		slideTimerRef.current = window.setInterval(() => {
			goToNextSlide()
		}, autoPlayInterval)

		return () => {
			if (slideTimerRef.current) {
				clearInterval(slideTimerRef.current)
			}
		}
	}, [autoPlayInterval, goToNextSlide, isPaused])

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = e => {
			if (isFullScreen) return // Don't handle when in fullscreen mode (handled by FullScreenImage)

			if (e.key === 'ArrowLeft') {
				goToPrevSlide()
			} else if (e.key === 'ArrowRight') {
				goToNextSlide()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [goToNextSlide, goToPrevSlide, isFullScreen])

	if (!slides.length) {
		return <div className="p-4 text-muted-foreground">No images to display</div>
	}

	return (
		<>
			<div
				className={cn(
					'relative overflow-hidden rounded-lg border border-border',
					'h-[50vh] w-full max-w-full',
					'group cursor-pointer',
					className
				)}
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
				onClick={openFullScreen}>
				{/* Image slides */}
				<div className="relative h-full w-full">
					{slides.map((slide, index) => (
						<div
							key={slide.id}
							className={cn(
								'absolute inset-0 h-full w-full transition-opacity duration-700',
								index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
							)}>
							<img src={slide.src} alt={slide.alt} className="h-full w-full object-cover" />
						</div>
					))}
				</div>

				{/* Indicators */}
				<div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
					{slides.map((_, index) => (
						<button
							key={index}
							className={cn(
								'h-2 w-2 rounded-full transition-all duration-300',
								'focus:outline-none focus:ring-2 focus:ring-primary',
								index === currentIndex ? 'bg-primary w-4' : 'bg-primary/60 hover:bg-primary/80'
							)}
							onClick={e => {
								e.stopPropagation()
								setCurrentIndex(index)
							}}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>

				{/* Navigation buttons */}
				<SlideNavigation onPrev={goToPrevSlide} onNext={goToNextSlide} />
			</div>

			{/* Fullscreen view */}
			<FullScreenImage image={slides[currentIndex] || null} isOpen={isFullScreen} onClose={closeFullScreen} />
		</>
	)
}
