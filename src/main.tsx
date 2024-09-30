import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.tsx'
import './index.css'
import {ProductStore} from './store/store.ts';

const store = new ProductStore()

interface State {
    store:ProductStore,
}

export const Context = React.createContext<State>({ store });

createRoot(document.getElementById('root')!).render(
  <StrictMode >
      <Context.Provider value={{ store }} >
          <Router >
            <App/>
          </Router>
      </Context.Provider>
  </StrictMode>,
)
