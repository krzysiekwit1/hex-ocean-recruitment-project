import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import '../../styles/styles.scss'

const Layout = ({ children }) => (
  <>
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='#home'>Krzysztof Witkowski</Navbar.Brand>
    </Navbar>
    {children}
  </>
)

export default Layout
