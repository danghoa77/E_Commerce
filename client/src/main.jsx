import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import { Toaster } from '../components/ui/toaster'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster className="fixed top-5 right-5 z-[9999]" />
      <App />
    </Provider>
  </BrowserRouter>,
)
