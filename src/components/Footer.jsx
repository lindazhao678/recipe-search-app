import React from 'react'

function Footer() {
  const getCurrentYear =()=> {
    return new Date().getFullYear();
  }


  return (
    <footer>
    Recipe Search App &copy; {getCurrentYear()}
  </footer>
  )
}

export default Footer
