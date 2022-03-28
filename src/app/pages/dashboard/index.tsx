import React, { useEffect, useState } from 'react'
import { Gallery, Toolbar } from 'app/components'
import axiosInstance from 'app/services/axiosService'
import usePhotos from 'app/hooks/usePhotos'
import Pagination from 'app/components/pagination'
import useWindowSize from 'app/hooks/useWindowSize'

export interface IPhoto {
  id: string
  farm: number  
  isfamily: number
  isfriend: number
  ispublic: number
  owner: string
  secret: string
  server: string
  title: string
}

const Dashboard: React.FC = () => {
  const { 
    searchText, 
    page, 
    pageSize, 
    setPage, 
    totalCount, 
    setTotalCount,
    sort
  } = usePhotos()
  const [photos, setPhotos] = useState<IPhoto[]>([])

  const windowSize = useWindowSize()

  const isDesktop = windowSize.width > 768

  async function fetchImages() {
    try {
      const result = await axiosInstance.get('?method=flickr.photos.search&api_key=' 
      + 'a3aaff05f8fbe045216b9a991affd3ad' + '&user_id=' 
      + '127665714@N08' + '&per_page=' 
      + pageSize + '&page=' 
      + page + '&text=' 
      + searchText + '&sort=' 
      + sort + '&format=json&nojsoncallback=1')

      const nextPhotos = isDesktop ? 
        result?.data.photos.photo : 
        [...photos, ...result?.data.photos.photo]
   
      setPhotos(nextPhotos)
      setTotalCount(result?.data.photos.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(page, "useEffect")
    fetchImages()
  }, [page, pageSize, searchText, isDesktop, sort])

  const setCurrentPage = (page: number) => {
    setPage(page)
  }
  
  return (
    <div className='dashboard'>
      <div className='dashboard__container'>
        <div className='dashboard__toolbar'>
          <Toolbar fetchImages={fetchImages} />
        </div>
        <div className='dashboard__content'>
          <Gallery photos={photos} fetchImages={fetchImages} />
          <div className='dashboard__content-pagination'>
            {isDesktop && <Pagination
              className='pagination-bar'
              currentPage={page}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={page => setCurrentPage(page)}
            />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
