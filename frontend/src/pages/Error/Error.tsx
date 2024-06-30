import MainLayout from '~/layouts/MainLayout/MainLayout'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Error() {
  const { t } = useTranslation()

  return (
    <MainLayout>
      <Button></Button>
      <Button>
        <Link to="/home">Home</Link>
      </Button>
      <p>{t('Nav.test')}</p>
    </MainLayout>
  )
}
