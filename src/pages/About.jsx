import React from 'react'
import AboutHero from '../componets/AboutHero'
import AboutPage from '../componets/About'
import TeamGrid from '../componets/Team'
import BlueprintValues from '../componets/Values'
import Certification from '../componets/Certification'
import PartnersSection from '../componets/Partners'
import Mainefesto from '../componets/Mainfesto'
const About = () => {
  return (
    <div>
        <AboutHero />
        <AboutPage />
        <TeamGrid />
        <Mainefesto />
        <BlueprintValues />
        <Certification />
        <PartnersSection />

    </div>
  )
}

export default About