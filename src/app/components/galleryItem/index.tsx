import React from 'react'
import { IPhoto } from 'app/pages/dashboard'

export interface IGalleryItemProps {
  photo: IPhoto
}

const GalleryItem: React.FC<IGalleryItemProps> = (props: IGalleryItemProps) => {
  const { photo } = props
  
  return (
    <div className='gallery__item'>
      <div className='gallery__item-photo'>
        {/* eslint-disable-next-line */}
        <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} alt={`${photo.title}`} />
        <p className='gallery__item-caption'>{photo.server}</p>
      </div>
      <p className='gallery__item-author'>{photo.title}</p>
    </div>
  )
}

export default GalleryItem
