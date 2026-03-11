import React from 'react'
import ProjectHero from '../componets/ProjectsHero'
import ProjectGrid from '../componets/Project'
import ProjectStats from '../componets/ProjectStats'
import Renovation from '../componets/Renovation'
import CostEstimator from '../componets/CostEstimator'
import OngoingProjects from '../componets/Ongoing'
import HomeSvg from '../componets/Homesvg'
import Normal from '../componets/Normal'
const ProjectM = () => {
  return (
    <div>
        <ProjectHero />
        <ProjectGrid />
        <Normal />
        {/* <HomeSvg /> */}
        <ProjectStats />
        <Renovation />
        <CostEstimator />
        <OngoingProjects />
    </div>
  )
}

export default ProjectM