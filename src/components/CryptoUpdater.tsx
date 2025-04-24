import { useWebSocketUpdates } from '../hooks/useWebSocketUpdates';

// Component that just handles WebSocket updates
const CryptoUpdater = () => {
  // This hook will set up and tear down the WebSocket connection
  useWebSocketUpdates();
  
  // This component doesn't render anything
  return null;
};

export default CryptoUpdater;