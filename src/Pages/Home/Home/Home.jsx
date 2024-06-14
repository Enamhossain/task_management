import React from 'react'
import Hero from '../../../Components/Hero'
import ProjectSection from '../../../Components/ProjectSection'
import PricingTable from '../../../Components/pricingPlans'
import Testimonial from '../../../Components/Testomonial'

const Home = () => {
  return (
    <div>
       <Hero/>
       <ProjectSection/>
       <PricingTable/>
       <Testimonial/>
    </div>
  )
}

export default Home