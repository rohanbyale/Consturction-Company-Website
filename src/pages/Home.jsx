import React from 'react'
import Hero from '../componets/Hero'
import TrustBar from '../componets/TrustBar'
import ServiceSection from '../componets/Service'
import ProjectGrid from '../componets/Project'

import Cta from '../componets/Cta'
import Process from '../componets/Process'
import WhyChooseUs from '../componets/WhyChooseus'
import Testimonials from '../componets/Testimonial'
import Future from '../componets/Future'
// import Ctatwo from '../componets/Ctatwo'

const Home = () => {
  return (
    <div>
        <Hero />
        <Future />
        <TrustBar />
        <ServiceSection />
        <ProjectGrid />
       
        <Cta />
        {/* <Ctatwo /> */}
        <Process />
        <WhyChooseUs />
        <Testimonials />
    </div>
  )
}

export default Home