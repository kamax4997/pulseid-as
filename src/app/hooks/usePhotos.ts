import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'app/store'
import {
  setSearchText,
  setPage,
  setPageSize,
  setTotalCount,
  setSort,
} from 'app/store/slices/dashboard'

const usePhotos = () => {
  const dispatch = useDispatch()

  const { 
    searchText, 
    page, 
    pageSize, 
    totalCount, 
    sort,
  } = useSelector(
    (state: IRootState) => state.dashboard
  )

  return {
    searchText,
    page,
    pageSize,
    totalCount,
    sort,

    setPage: (page: number) => dispatch(setPage(page)),
    setPageSize: (pageSize: number) => dispatch(setPageSize(pageSize)),
    setSearchText: (searchText: string) => dispatch(setSearchText(searchText)),
    setTotalCount: (totalCount: number) => dispatch(setTotalCount(totalCount)),
    setSort: (sort: string) => dispatch(setSort(sort)),
  }
}

export default usePhotos
