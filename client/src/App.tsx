import Home from './pages/Home/Home'
import Error from './pages/Error/Error'
import { Routes, Route } from 'react-router-dom'
import { PATH } from './constants/paths'

function App() {
  return (
    <>
      <Routes>
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.HOMEPAGE} element={<Home />} />
        <Route path={PATH.ERROR} element={<Error />} />
      </Routes>
    </>
  )
}

export default App
