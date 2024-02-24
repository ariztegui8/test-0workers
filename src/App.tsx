import React, { useEffect, useState } from 'react';

interface Country {
  name: string
  checked: boolean
  id: number
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([
    {
      name: 'India',
      checked: false,
      id: 1
    },
    {
      name: 'USA',
      checked: false,
      id: 2
    },
    {
      name: 'France',
      checked: false,
      id: 3
    }
  ])
  const [savedCountries, setSavedCountries] = useState<string[]>([])
  const [selectAllCountry, setSelectAllCountry] = useState<boolean>(false)

  useEffect(() => {
    const allSelected = countries.every(country => country.checked)
    console.log('allSelected', allSelected)
    setSelectAllCountry(allSelected)
  }, [countries])

  const selectCountry = (index: number): void => {
    const clone = [...countries]
    clone[index].checked = !clone[index].checked
    setCountries(clone)
    console.log('clone', clone)

    if (clone[index].checked) {
      setSavedCountries([...savedCountries, clone[index].name])
    } else {
      setSavedCountries(savedCountries.filter(country => country !== clone[index].name))
    }
  }

  const selectAllCountries = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked
    const newClone = countries.map(country => ({
      ...country,
      checked: checked
    }))
    console.log('newClone', newClone)
    setCountries(newClone)

    if (checked) {
      setSavedCountries(newClone.map(country => country.name))
    } else {
      setSavedCountries([])
    }
  }

  return (
    <div className='py-6 px-20'>
      <h1 className='text-4xl font-medium mb-6'>Select Countries</h1>
      <div className='flex items-center gap-2 mb-1'>
        <input
          type="checkbox"
          className='checkbox'
          checked={selectAllCountry}
          onChange={selectAllCountries}
        />
        <p className='text-xl'>Select All</p>
      </div>
      <div className='mb-4'>
        {countries.map((country, index) => (
          <div key={country.id} className='flex items-center gap-2 mb-1'>
            <input
              type="checkbox"
              className='checkbox'
              checked={country.checked}
              onChange={() => selectCountry(index)}
            />
            <p className='text-xl'>{country.name}</p>
          </div>
        ))}
      </div>
      <pre>{JSON.stringify({ savedCountries }, null, 2)}</pre>
    </div>
  )
}

export default App
