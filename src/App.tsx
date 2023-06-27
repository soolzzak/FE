import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga';
import { Router } from './shared/Router';

const TRACKING_ID = 'G-5N8TCV0XGN';
ReactGA.initialize(TRACKING_ID);
const queryClient = new QueryClient();
const toastConfig = {
  position: 'top-center',
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position={toastConfig.position as ToastPosition}
        autoClose={1000}
      />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
