import Inventory from './components/Inventory'
import Buscador from './components/Buscador'

function App() {
  return (
    <div className="min-h-screen bg-blue-500 p-8 flex flex-col items-center">
      <Buscador />
      <Inventory />
    </div>
  )
}

export default App