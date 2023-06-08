import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from './shared/Router';

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
