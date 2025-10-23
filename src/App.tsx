import { useState } from 'react'
import Segment from './components/Segment'
import ImageViewer from './components/ImageViewer'
import InstallButton from './components/InstallButton'
import './App.css'

function App() {
  const [selectedMenu, setSelectedMenu] = useState(0)

  const menus = ['메뉴1', '메뉴2']
  const images = ['/111.png', '/222.png']

  return (
    <div className="app">
      <header className="header">
        <Segment
          options={menus}
          selected={selectedMenu}
          onChange={setSelectedMenu}
        />
        <InstallButton />
      </header>
      <main className="main">
        <ImageViewer imageUrl={images[selectedMenu]} />
      </main>
    </div>
  )
}

export default App
