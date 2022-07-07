import ReactDOM from 'react-dom/client';
import './global.scss';
import App from './App';
import { AuthContextProvider } from './auth/auth-context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
