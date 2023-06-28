import ReactGA from 'react-ga';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const TRACKING_ID = 'G-5N8TCV0XGN';
ReactGA.initialize(TRACKING_ID);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
