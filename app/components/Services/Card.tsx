"use client"

import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

type CardProps = {
  src: string
  alt: string
  sliceIndex?: number
  totalSlices?: number
  backImage?: string
  href?: string
  children?: ReactNode
  backfaceClassName?: string
}

const Card = ({
  src,
  alt,
  sliceIndex,
  totalSlices = 6,
  backImage,
  href,
  children,
  backfaceClassName = "",
}: CardProps) => {
  const backContent = (
    <>
      {backImage && (
        <>
          <Image
            src={backImage}
            alt={alt}
            fill
            sizes="(max-width: 640px) 30vw, 400px"
            className="object-cover transition-transform duration-500 "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-0" />
        </>
      )}
      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        {children}
      </div>
    </>
  )

  const backClassName = `absolute inset-0 flex flex-col justify-between overflow-hidden border border-white/20 p-3 sm:p-5 lg:p-6 backface-hidden transform-[rotateY(180deg)_translateZ(4px)] group cursor-pointer ${backfaceClassName}`

  return (
    <div
      data-card-shell
      className="relative z-0 aspect-[16/10] min-w-0 w-[clamp(100px,26vw,380px)] sm:w-[clamp(150px,27vw,400px)] lg:w-[clamp(220px,28vw,440px)] overflow-visible bg-transparent perspective-[1000px]"
    >
      <div
        data-flip-inner
        className="relative h-full w-full rounded-2xl transform-3d will-change-transform"
      >
        <div
          data-card-face="front"
          className="absolute inset-0 overflow-hidden backface-hidden transform-[translateZ(4px)]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {sliceIndex !== undefined && totalSlices ? (
            <img
              src={src}
              alt={alt}
              className="absolute top-0 h-full max-w-none object-fit"
              style={{
                width: `${totalSlices * 100}%`,
                left: `-${sliceIndex * 100}%`,
              }}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 20vw, (max-width: 1024px) 16vw, 280px"
              className="object-cover"
            />
          )}
        </div>

        {href ? (
          <Link
            href={href}
            data-card-face="back"
            className={backClassName}
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            {backContent}
          </Link>
        ) : (
          <div
            data-card-face="back"
            className={backClassName}
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            {backContent}
          </div>
        )}
      </div>
    </div>
  )
}

export default Card