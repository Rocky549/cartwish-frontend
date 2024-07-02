import React from 'react'
import './LinkWithIcon.css'
import { NavLink } from 'react-router-dom'

const LinkWithIcon = ({link,title,emoji,sidebar}) => {
  return (
    <NavLink to={link} className={sidebar ? 'align_center sidebar_link' : 'align_center'} >{title}<img src={emoji} alt="" className="link_emoji" /></NavLink>
  )
}

export default LinkWithIcon