import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
