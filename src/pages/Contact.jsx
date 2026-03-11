import React from 'react'
import SocialConnectivity from '../componets/Social'
import Form from '../componets/Form'
import Map from '../componets/Map'
import Approach from '../componets/Approach'
import ProcessFAQ from '../componets/Faq'
import ContactHero from '../componets/ContactHero'
import Timing from '../componets/StudioStatus'
const Contact = () => {
  return (
    <div>
      <ContactHero  />
        <SocialConnectivity />
        <Approach />
        <Form />
        <Map />
        <Timing />
        <ProcessFAQ />
    </div>
  )
}

export default Contact