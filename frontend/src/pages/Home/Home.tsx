import MainLayout from '~/layouts/MainLayout/MainLayout'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Home() {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'))
  const handleChangeLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en')
    i18n.changeLanguage(language === 'en' ? 'vi' : 'en')
  }

  return (
    <>
      <MainLayout>
        <Button onClick={handleChangeLanguage}>ChangeLanguage</Button>
        <Button>
          <Link to="/error">Error</Link>
        </Button>
        <p>{t('Nav.Home')}</p>
        <p>Current Language: {language}</p>
      </MainLayout>
    </>
  )
}

export default Home
