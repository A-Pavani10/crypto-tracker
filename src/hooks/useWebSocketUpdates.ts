import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MockWebSocket } from '../utils/mockWebSocket';
import { updatePrices, selectAllAssets } from '../store/cryptoSlice';

export const useWebSocketUpdates = () => {
  const dispatch = useDispatch();
  const assets = useSelector(selectAllAssets);

  useEffect(() => {
    // Create mock WebSocket connection
    const ws = new MockWebSocket(assets);
    
    // Connect and handle updates
    ws.connect((updates) => {
      dispatch(updatePrices(updates));
    });
    
    // Cleanup on unmount
    return () => {
      ws.disconnect();
    };
  }, [dispatch, assets]);
};