import React from 'react'

import { Typography } from '@mui/material'

import LandingImage from '../../images/landingImage.png'

function Landing() {
  return (
    <div style={{ display : "flex", justifyContent : "center", alignItems : "center", height : "70vh", margin : "100px"}}>
        <div>
            <Typography variant='h3'>Streamline Your Workflow with Planify.</Typography>
            <Typography variant='subtitle1'>Plan, track and organize your dream projects or everyday tasks.</Typography>
        </div>
        <div style={{ width : "50%"}}>
            <img src={LandingImage} style={{ objectFit : "cover", width : "100%"}} />
        </div>
    </div>
  )
}

export default Landing