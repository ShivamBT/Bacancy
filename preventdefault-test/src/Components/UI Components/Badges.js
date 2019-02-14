import React from 'react';
import {Badge} from 'reactstrap';
import {FaUserPlus} from 'react-icons/fa';


export const Badge1 = () =>
{
  return(
    <div>
      <h1>
      <Badge color="secondary">
      <FaUserPlus /> Registration Form
      </Badge>
      </h1>
      
    </div>
  )
}

export const Badge2 = () =>
{
  return(
    <Badge color="secondary">
      Gender
    </Badge>
  )
  }

export const Badge3 = () =>
{
  return(
    <Badge color="secondary">
      Likes
    </Badge>
  )
}


export const Badge4 = () =>
{
  return(
  <Badge color="danger">
  All Fields except Likes and Address are compulsory
  </Badge>)
}

export const Badge5=()=>
{
  return(
    <Badge color="danger">
      Select one please
    </Badge>
  )
}

export const Badge6=()=>
{
  return(
    <Badge color="danger">
      Invalid Email
    </Badge>
  )
}

export const Badge7=()=>
{
  return(
    <Badge color="danger">
      Invalid Password
    </Badge>
  )
}

export const Badge8=()=>
{
  return(
    <Badge color="danger">
      Invalid Confirm Password
    </Badge>
  )
}

export const Badge9=()=>
{
  return(
    <Badge color="danger">
      Passwords do not match
    </Badge>
  )
}

export const Badge10=()=>
{
  return(
    <Badge color="danger">
      Invalid Phone Number
    </Badge>
  )
}

export const Badge11 = () =>
{
  return (
    <Badge color="danger">
      Select One
    </Badge>
  )
}