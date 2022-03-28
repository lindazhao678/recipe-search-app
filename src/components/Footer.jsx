import React from 'react'

function Footer() {
  const getCurrentYear =()=> {
    return new Date().getFullYear();
  }


  return (
    <footer className="footer">
    Recipe Search App &copy; {getCurrentYear()} Lijun Zhao
  </footer>
  )
}

export default Footer
