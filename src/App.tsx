import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CryptoTable from './components/CryptoTable';
import Header from './components/Header';
import Footer from './components/Footer';
import CryptoUpdater from './components/CryptoUpdater';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-950 text-white">
        <CryptoUpdater />
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Cryptocurrency Prices</h2>
          <CryptoTable />
        </main>
        
        <Footer />
      </div>
    </Provider>
  );
}

export default App;