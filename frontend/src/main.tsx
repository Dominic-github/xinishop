// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.tsx'
import { Provider } from 'react-redux'
import { store } from '~/stores/store'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer } from 'react-toastify'
import theme from './theme'
import i18next from '~/utils/i18next'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>

  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider
        defaultOptions={{
          dialogProps: {
            maxWidth: 'xs'
          },
          confirmationButtonProps: {
            color: 'secondary',
            variant: 'outlined'
          },
          cancellationButtonProps: {
            color: 'inherit'
          },
          allowClose: false,
          buttonOrder: ['confirm', 'cancel']
        }}
      >
        <CssBaseline />
        <BrowserRouter>
          <I18nextProvider i18n={i18next}>
            <App />
          </I18nextProvider>
        </BrowserRouter>
        <ToastContainer position="bottom-left" theme="colored" />
      </ConfirmProvider>
    </CssVarsProvider>
  </Provider>
  // </React.StrictMode>
)
