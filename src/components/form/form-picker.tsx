'use client'

import { defaultImages } from '@/constants/images'
import { unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { FormErrors } from './form-errors'
import { Skeleton } from '../ui/skeleton'

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([])
  const [isLoading, setLoading] = useState(true)
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
  const { pending } = useFormStatus()

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        })

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>
          setImages(newImages)
        } else {
          console.error('Failed to get images from Unsplash')
        }
      } catch (error) {
        console.error(error)
        setImages(defaultImages)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  const handleSelectImage = (imageId: string) => {
    if (pending) return
    setSelectedImageId(imageId)
  }

  if (isLoading) {
    return (
      <div className='grid grid-cols-3 gap-2'>
        {Array(9)
          .fill(0)
          .map((_, inx) => (
            <Skeleton key={inx} className='aspect-video h-full w-full rounded-sm' />
          ))}
      </div>
    )
  }

  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2'>
        {images.map((image) => (
          <ImageItem
            key={image.id}
            id={id}
            image={image}
            selectedImageId={selectedImageId}
            onSelectImage={handleSelectImage}
            pending={pending}
          />
        ))}
      </div>
      <FormErrors id='image' errors={errors} />
    </div>
  )
}

interface ImageItemProps {
  id: string
  image: Record<string, any>
  selectedImageId: string | null
  onSelectImage: (imageId: string) => void
  pending: boolean
}

const ImageItem: React.FC<ImageItemProps> = ({ id, image, selectedImageId, onSelectImage, pending }) => {
  return (
    <div
      onClick={() => onSelectImage(image.id)}
      className={cn(
        'cursor-pointer relative aspect-video group transition bg-muted',
        pending && 'opacity-50 pointer-events-none'
      )}
    >
      <input
        id={id}
        name={id}
        type='radio'
        className='hidden'
        readOnly
        checked={selectedImageId === image.id}
        disabled={pending}
        value={`${image.id}|${image.urls.regular}|${image.urls.full}|${image.links.html}|${image.user.name}`}
      />
      <Image fill src={image.urls.thumb} alt='Unsplash image' className='object-cover rounded-sm' />
      {selectedImageId === image.id && (
        <div className='absolute inset-y-0 h-full w-full bg-black/50 flex items-center justify-center'>
          <Check className='w-4 h-4 text-white' />
        </div>
      )}
      <Link
        href={image.links.html}
        target='_blank'
        className='opacity-0 transition-opacity group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'
      >
        {image.user.name}
      </Link>
    </div>
  )
}
