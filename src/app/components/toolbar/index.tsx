import React, { useState, useRef, useEffect } from 'react'
import usePhotos from 'app/hooks/usePhotos'
import Select, { ActionMeta, OnChangeValue } from 'react-select'

export interface ISortOption {
  value: string
  label: string
}

const options: ISortOption[] = [
  { value: 'date-taken-desc', label: 'date-taken-desc' },
  { value: 'date-posted-asc', label: 'date-posted-asc' },
  { value: 'date-posted-desc', label: 'date-posted-desc' },
  { value: 'date-taken-asc', label: 'date-taken-asc' },
  { value: 'interestingness-desc', label: 'interestingness-desc' },
  { value: 'interestingness-asc', label: 'interestingness-asc' },
  { value: 'relevance', label: 'relevance' }, 
  { value: 'beverage', label: 'beverage' }
]

export interface IToolbarProps {
  fetchImages: (page: number, take: number) => {}
}

const Toolbar: React.FC<IToolbarProps> = (props: IToolbarProps) => {
  const { sort, searchText, setSearchText, setSort } = usePhotos()
  const [searchTerm, setSearchTerm] = useState<string>(searchText)
  const controllerRef = useRef<AbortController | null>()

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value)
    setSearchText(e.currentTarget.value)
  }

  const handleSort = (
    newValue: OnChangeValue<ISortOption, false>,
    actionMeta: ActionMeta<ISortOption>
  ) => {
    if (newValue) setSort(newValue?.value)
  }

  useEffect(() => {
    async function search() {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }

      const controller = new AbortController()
      controllerRef.current = controller

      try {
        if (searchText.length) {
          setSearchText(searchText)

          controllerRef.current = null
        } else {
          setSearchText('')
        }
      } catch (e) {

      }
    }

    search()
  }, [searchText])

  return (
    <div className='toolbar'>
      <div className='toolbar__container'>
        <div className='toolbar__content'>
          <div className='toolbar__search'>
            <input 
              className='toolbar__search-input'
              placeholder='search...'
              value={searchTerm}
              onChange={handleChange} />
          </div>
          <div className='toolbar__sort'>
            <Select 
              options={options} 
              onChange={handleSort}
              value={options.find(option => option.value === sort)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toolbar
