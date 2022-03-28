import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import InfiniteScroll from 'react-infinite-scroll-component'
import GalleryItem from '../galleryItem'
import Loading from 'app/@core/loading'
import { IPhoto } from 'app/pages/dashboard'
import useWindowSize from 'app/hooks/useWindowSize'
import usePhotos from 'app/hooks/usePhotos'

export interface IGalleryProps {
  photos: IPhoto[]
  fetchImages: () => {}
}

const GalleryItemSkeleton: React.FC = () => (
  <div className='gallery__item'>
    <div className='gallery__item-photo'>
      <Skeleton width={280} height={160} />
      <Skeleton className="gallery__item-caption" width={240} />
    </div>
    <Skeleton className="gallery__item-author" width={240} />
  </div>
)

const Gallery: React.FC<IGalleryProps> = (props: IGalleryProps) => {
  const { photos, fetchImages } = props
  const { page, setPage } = usePhotos()

  const handleNext = () => {
    setPage(page + 1)
    fetchImages()
  }

  const windowSize = useWindowSize()

  return (
    <>
    {photos.length ?
      (windowSize.width > 768 ? (
        <div className='gallery'>
          <div className='gallery__content'>
            {photos.map((photo, i) => (
              <GalleryItem key={i} photo={photo} />
            ))}
          </div>
        </div>
      ) : (
        <InfiniteScroll
          next={handleNext}
          hasMore={true}
          dataLength={photos.length}
          loader={<Loading />}
          style={{ overflow: 'unset' }}
        >
          <div className='gallery'>
            <div className='gallery__content'>
              {photos.map((photo, i) => (
                <GalleryItem key={i} photo={photo} />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )) : (
        <div className='gallery'>
          <div className='gallery__content'>
            <GalleryItemSkeleton />
            <GalleryItemSkeleton />
            <GalleryItemSkeleton />
            <GalleryItemSkeleton />
            <GalleryItemSkeleton />
            <GalleryItemSkeleton />
          </div>
        </div>
      )
    }
    </>
  )
}

export default Gallery
