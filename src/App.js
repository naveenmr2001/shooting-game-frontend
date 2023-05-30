import { Route,Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Start from './components/Start/Start';
import { QueryClient,QueryClientProvider } from 'react-query';

function App() {
  const newClient = new QueryClient();
  return (
    <QueryClientProvider client={newClient}>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/game' element={<Home/>}/>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
