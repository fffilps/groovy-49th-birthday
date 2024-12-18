"use client"

import { useState, Suspense } from "react"
import { Dialog, DialogContent } from "@/components/ui/Dialog"
import Image from "next/image"
import { IMAGE_QUERYResult } from "@/sanity/types"
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

function forceDownload(blobUrl: string, filename: string) {
  const a: HTMLAnchorElement = document.createElement("a")
  a.download = filename
  a.href = blobUrl
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function downloadPhoto(url: string, filename: string) {
  if (!filename) filename = url.split("\\").pop()!.split("/").pop()!
  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: "cors",
  })
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob)
      forceDownload(blobUrl, filename)
    })
    .catch((e) => console.error(e))
}

export function Gallery({ imagesData }: { imagesData: IMAGE_QUERYResult }) {
  const [selectedImage, setSelectedImage] = useState<null | typeof imagesData[0]>(null)
  const [isOpen, setIsOpen] = useState(false)

  console.log(imagesData)
  const handleImageClick = (image: typeof imagesData[0]) => {
    setSelectedImage(image)
    setIsOpen(true)
  }

  return (
    <div className="p-4">
      <Suspense fallback={<div className="text-center">Loading images...</div>}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagesData.map((image, i) => (
            <Suspense key={i} fallback={<div className="text-center">Loading images...</div>}>
              <div
                key={i}
                className="aspect-square relative overflow-hidden rounded-lg border-4 border-[#FF69B4] hover:scale-105 transition-transform duration-200"
                onClick={() => handleImageClick(image)}
            >
              <Image
                src={image.url || ""}
                  alt={`Austin Powers Moment ${i + 1}`}
                  className="object-cover"
                  fill
                />
              </div>
            </Suspense>
          ))}
        </div>
      </Suspense>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl w-full bg-[#3B185F] text-white border-2 border-[#FF69B4]">
          {selectedImage && (
            <div className="relative">
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button
                  onClick={() => downloadPhoto(selectedImage.url!, `austin-powers-${selectedImage.originalFilename}.jpg`)}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                  title="Download fullsize version"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
                <a
                  href={selectedImage.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a>
              </div>
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={selectedImage.url!}
                  alt={`Austin Powers Moment ${selectedImage.originalFilename}`}
                  className="object-contain"
                  fill
                  priority
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

