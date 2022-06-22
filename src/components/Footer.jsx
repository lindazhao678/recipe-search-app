import React from 'react'

function Footer() {
  const getCurrentYear =()=> {
    return new Date().getFullYear();
  }

  return (
    <footer className="footer">
    Recipe Search App &copy; {getCurrentYear()} <a className="ms-2 footer-link" href="https://lijunzhao.com" target="_blank" rel="noreferrer">Lijun Zhao</a>
  </footer>
  )
}

export default Footer
