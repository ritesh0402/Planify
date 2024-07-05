import React from 'react'

import { Typography } from '@mui/material'

import LandingImage from '../../images/landingImage.png'

function Landing() {
  return (
    <div style={{ display : "flex", justifyContent : "center", alignItems : "center", height : "70vh"}}>
        <div>
            <Typography variant='h3'>Streamline Your Workflow with Planify.</Typography>
            <Typography variant='subtitle1'>Plan, track and organize your dream projects or everyday tasks.</Typography>
        </div>
        <div>
            <img src={LandingImage} style={{ objectFit : "cover", width : "40%"}} />
        </div>
    </div>
  )
}

export default Landing