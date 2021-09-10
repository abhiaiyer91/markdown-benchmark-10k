import React from 'react'
import fetch from 'isomorphic-fetch'

function UsingSSR({ serverData }) {
  return (
    <img src={serverData.message} />
  )
}

export async function getServerData() {
  const data = await fetch(`https://dog.ceo/api/breeds/image/random`)
    .then(res => res.json())

  /*
   * data has the shape of "message", "status" where message is the image src
   */

  return {
    props: data
  }
}

export default UsingSSR
