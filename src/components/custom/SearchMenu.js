'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import MenuContactSection from './MenuContactSection'
import ProductBox from './ProductBox'
import Products from './Products'

const SearchMenu = ({ setOpen }) => {
  const [input, setInput] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const suggestions = ['Prstenje', 'Plavi dijamant', 'Prsten sa cirkonom']
  const pages = [
    'Razlika izmedju belog i zutog zlata',
    'Kako kupovati mindjuše?',
  ]

  const links = [
    {
      title: 'Prstenje',
      url: '/prstenje',
    },
    {
      title: 'Burme',
      url: '/burme',
    },
    {
      title: 'Narukvice',
      url: '/narukvice',
    },
    {
      title: 'Ogrlice',
      url: '/ogrlice',
    },
    {
      title: 'Mindjuše',
      url: '/mindjuse',
    },
    {
      title: 'Privesci',
      url: '/privesci',
    },
    {
      title: 'O nama',
      url: '/o-nama',
    },
  ]

  // ovo je intermediate, prvo da uradim ono osnovno pa cu onda to.
  // const fetchProducts = async (search) => {
  //   if (search === '') {
  //     setLoading(false)
  //     return
  //   }

  //   try {
  //     setLoading(true)
  //     const response = await fetch('/api/wix', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ search }),
  //     })
  //     const data = await response.json()
  //     setProducts(data)
  //   } catch (error) {
  //     console.error('Error fetching products:', error)
  //   } finally {
  //     setLoading(false) // Ugasite loading bez obzira na ishod (uspeh/greška)
  //   }
  // }

  // useEffect(() => {
  //   // Ako je input prazan, ne radi ništa
  //   if (input === '') return

  //   const timeoutId = setTimeout(() => {
  //     fetchProducts(input)
  //   }, 1000) // Povećaj interval na 1000ms (1 sekunda)

  //   // Cleanup funkcija koja čisti timeout svaki put kad se input menja
  //   return () => {
  //     clearTimeout(timeoutId)
  //   }
  // }, [input])

  const handleSearch = () => {
    const searchKeyword = encodeURIComponent(input) // Enkodovanje za bezbedan URL
    const url = `/search?keyword=${searchKeyword}` // Konstrukcija URL-a
    router.replace(url)
    setOpen(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 75 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 75 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className='w-full h-full fixed top-0 right-0 bg-white z-50 xl:w-[30vw] py-10 px-[1.5rem] xl:px-[2rem] overflow-y-scroll'
    >
      <div onClick={() => setOpen(false)} className='cursor-pointer w-fit'>
        <MdOutlineArrowBackIos size={26} />
      </div>

      <div className='border border-gray-300 mt-10 py-4 px-4 flex items-center justify-between'>
        <input
          type='text'
          placeholder='Pretražite'
          className='outline-none w-full mr-4 text-[1.5rem]'
          style={{
            fontFamily: 'var(--font-lato)',
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <div className='cursor-pointer' onClick={() => handleSearch()}>
          <CiSearch size={36} />
        </div>
      </div>

      {input === '' && (
        <>
          <div className='my-10'>
            {links.map((item, i) => (
              <Link href={item.url} key={i} onClick={() => setOpen(false)}>
                <li
                  style={{
                    fontFamily: 'var(--font-lato)',
                  }}
                  className='list-none my-4 font-light text-[2rem] cursor-pointer w-fit transition-colors duration-300 text-[#006032c2] hover:text-[#006032]'
                >
                  {item.title}
                </li>
              </Link>
            ))}
          </div>
          <div>
            <MenuContactSection two={true} />
          </div>
        </>
      )}

      {input !== '' && (
        <Suggestions
          suggestions={suggestions}
          pages={pages}
          input={input}
          products={products}
          handleSearch={handleSearch}
        />
      )}
    </motion.div>
  )
}

export default SearchMenu

export const Suggestions = ({
  suggestions,
  pages,
  input,
  products,
  handleSearch,
}) => {
  return (
    <div className='my-10'>
      {/* <span
        className='uppercase text-[1rem] tracking-widest font-light text-[#212121]'
        style={{
          fontFamily: 'var(--font-lato)',
        }}
      >
        Preporuke
      </span>

      <div className='flex flex-col gap-4 mt-4'>
        {suggestions.map((item, i) => (
          <span
            key={i}
            className='text-[1.2rem] cursor-pointer'
            style={{
              fontFamily: 'var(--font-lato)',
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <span
        className='uppercase text-[1rem] tracking-widest font-light text-[#212121] mt-16 block'
        style={{
          fontFamily: 'var(--font-lato)',
        }}
      >
        Stranice
      </span>

      <div className='flex flex-col gap-4 mt-4'>
        {pages.map((item, i) => (
          <span
            key={i}
            className='text-[1.2rem] cursor-pointer'
            style={{
              fontFamily: 'var(--font-lato)',
            }}
          >
            {item}
          </span>
        ))}
      </div> */}

      {/* <span
        className='uppercase text-[1rem] tracking-widest font-light text-[#212121] mt-16 block'
        style={{
          fontFamily: 'var(--font-lato)',
        }}
      >
        Proizvodi
      </span>

      <div className='grid grid-cols-2 gap-x-8 gap-y-8 mt-4'>
        {products &&
          products.map((item, i) => (
            <ProductBox
              key={i}
              price={false}
              title={item.name}
              slug={item.slug}
              collection={''}
              image={item.media.mainMedia.image}
            />
          ))}
      </div> */}

      <div className='mt-16 flex justify-center' onClick={() => handleSearch()}>
        <span
          className='text-center block uppercase border-b border-black w-fit cursor-pointer tracking-wider font-medium text-[1.2rem]'
          style={{
            fontFamily: 'var(--font-lato)',
          }}
        >
          Pretražite {`'${input}'`}
        </span>
      </div>
    </div>
  )
}
