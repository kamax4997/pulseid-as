import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from 'app/store'

export interface IInitialState {
  searchText: string
  page: number
  pageSize: number
  totalCount: number
  sort: string
}

const initialState: IInitialState = {
  searchText: '',
  page: 1,
  pageSize: 9,
  totalCount: 0,
  sort: 'date-taken-desc',
}

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSearchText(state, action) {
      state.searchText = action.payload.searchText
    },
    setPage(state, action) {
      state.page = action.payload.page
    },
    setPageSize(state, action) {
      state.pageSize = action.payload.pageSize
    },
    setTotalCount(state, action) {
      state.totalCount = action.payload.totalCount
    },
    setSort(state, action) {
      state.sort = action.payload.sort
    },
    // setPhotos(state, action) {
    //   state.photos[action.payload.tabId] = action.payload.photos
    // },
  },
})

// Reducer
export default slice.reducer

export function setSearchText(searchText: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(
      slice.actions.setSearchText({
        searchText,
      })
    )

    return true
  }
}

export function setPage(page: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(
      slice.actions.setPage({
        page,
      })
    )

    return true
  }
}

export function setPageSize(pageSize: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(
      slice.actions.setPageSize({
        pageSize,
      })
    )

    return true
  }
}

export function setTotalCount(totalCount: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(
      slice.actions.setTotalCount({
        totalCount,
      })
    )

    return true
  }
}

export function setSort(sort: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(
      slice.actions.setSort({
        sort,
      })
    )

    return true
  }
}
