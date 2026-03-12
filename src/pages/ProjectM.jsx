import React from 'react'
import ProjectHero from '../componets/ProjectsHero'
import ProjectGrid from '../componets/Project'
import ProjectStats from '../componets/ProjectStats'
import Renovation from '../componets/Renovation'
import CostEstimator from '../componets/CostEstimator'
import OngoingProjects from '../componets/Ongoing'
import HomeSvg from '../componets/Homesvg'
import Normal from '../componets/Normal'
import Three from '../componets/Threee'
import Building from '../componets/Building'
const ProjectM = () => {
  return (
    <div>
        <ProjectHero />
        <ProjectGrid />
        <Three />
        <Building />
        {/* <Normal /> */}
        {/* <HomeSvg /> */}
       
        <Renovation />
      
        <OngoingProjects />
      
           <CostEstimator />
              <ProjectStats />
    </div>
  )
}

export default ProjectM
