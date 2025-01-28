import Link from 'next/link'
import MyCard from '../MyComponents/MyCard'
import { Button } from '@/components/ui/button'
const Services = () => {
  return (
   <>
   <div className="flex justify-center">
      <h1 className=" mb-10 text-2xl text-primary font-sans font-semibold">
        Check out the services that we offer below. 
      </h1>
   </div>

     <div className=' w-full container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
         <div className='m-5'>
            <MyCard title='Manage Rentals' 
                    description='Issue a rental property for management'
                    content='Let us relieve you of the burden of managing your rental property and help you save a lot of time hence giving you a chance to dedicate your precious time to other important tasks.'
                    footer = {<Link href={'/contact-us'}><Button>Let&apos;s Talk</Button></Link>}/>
         </div>

         <div className='m-5'>
            <MyCard title='Sell your Land or Property' 
                    description='Find the best buyers for your property or land'
                    content='Let us help you in locating the best buyer for your land or property without all the stress of having to do it yourself.'
                    footer = {<Link href={'/contact-us'}><Button>Let&apos;s Talk</Button></Link>}/>
         </div>

         <div className='m-5'>
            <MyCard title='Buy a property or land' 
                    description='Find the best properties on the market at affordable rates'
                    content='Browse our collection of properties and find your best fit. We are here to help you secure your next home.'
                    footer = {<Link href={'Listings/for-sale'}><Button>Browse Collection</Button></Link>}/>
         </div>
     </div>
   </>
  )
}

export default Services