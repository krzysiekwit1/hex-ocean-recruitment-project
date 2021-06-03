import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import '../../styles/styles.scss'

const Layout = ({ children }) => (
  <>
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='#home'>Dish picker</Navbar.Brand>
    </Navbar>
    {children}
  </>
)

export default Layout
