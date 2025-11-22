import { createRoot } from 'react-dom/client'
import './index.css'
import "antd/dist/reset.css";
import AppContainer from './AppContainer.tsx';

createRoot(document.getElementById('root')!).render(
  <AppContainer />
)
