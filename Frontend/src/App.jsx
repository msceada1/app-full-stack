import Inventory from './components/Inventory'
import Buscador from './components/Buscador'
import ModalRegistroVenta from './components/ModalRegistroVenta'

function App() {
  return (
    <div className="min-h-screen bg-blue-500 p-8 flex flex-col items-center">
      <Buscador />
      <Inventory />
      <ModalRegistroVenta />
    </div>
  )
}

export default App