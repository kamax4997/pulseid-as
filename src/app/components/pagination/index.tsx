/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import classnames from 'classnames'
import { usePagination, DOTS } from 'app/hooks/usePagination'

export interface IPaginationProps {
  onPageChange: (nextValue: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  className: string
}

const Pagination = (props: IPaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange ? paginationRange[paginationRange.length - 1] : 1
  
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
        key={-1}
      >
        <div className="arrow left" />
      </li>
      {paginationRange && paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li key={pageNumber} className="pagination-item dots">&#8230;</li>
        }

        return (
          <li
            key={pageNumber}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  )
}

export default Pagination
