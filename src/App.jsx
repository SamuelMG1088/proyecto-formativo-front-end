import { useState } from 'react'

import './App.css'
// import ViewInfo from './components/ViewInfo/ViewInfo'
import Navigation from './layout/SideBar/SideBar.jsx'
import { NavigationProvider } from './layout/SideBar/SideBar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <NavigationProvider>
      <Navigation />
    </NavigationProvider>
    </>
  )
}

export default App
