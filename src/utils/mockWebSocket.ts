import { CryptoAsset } from '../types/crypto';

// Simulates WebSocket updates for crypto prices
export class MockWebSocket {
  private interval: number | null = null;
  private callback: ((updates: Partial<CryptoAsset>[]) => void) | null = null;
  private assets: CryptoAsset[] = [];

  constructor(assets: CryptoAsset[]) {
    this.assets = assets.map(asset => ({ ...asset }));
  }

  // Generate random price updates
  private generateUpdates(): Partial<CryptoAsset>[] {
    return this.assets.map(asset => {
      const assetCopy = { ...asset };
      // Random price change between -2% and +2%
      const priceChange = assetCopy.price * (Math.random() * 0.04 - 0.02);
      const newPrice = assetCopy.price + priceChange;
      
      // Random percentage changes
      const change1h = assetCopy.change1h + (Math.random() * 0.4 - 0.2);
      const change24h = assetCopy.change24h + (Math.random() * 0.6 - 0.3);
      const change7d = assetCopy.change7d + (Math.random() * 0.2 - 0.1);
      
      // Random volume change
      const volumeChange = assetCopy.volume24h * (Math.random() * 0.06 - 0.03);
      const newVolume = assetCopy.volume24h + volumeChange;

      return {
        id: assetCopy.id,
        price: newPrice,
        change1h,
        change24h,
        change7d,
        volume24h: newVolume,
      };
    });
  }

  // Connect to mock WebSocket
  connect(callback: (updates: Partial<CryptoAsset>[]) => void): void {
    this.callback = callback;
    
    // Simulate updates every 1-2 seconds
    this.interval = window.setInterval(() => {
      if (this.callback) {
        const updates = this.generateUpdates();
        this.callback(updates);
        
        // Update local assets with new values
        updates.forEach(update => {
          const assetIndex = this.assets.findIndex(a => a.id === update.id);
          if (assetIndex >= 0) {
            this.assets[assetIndex] = { ...this.assets[assetIndex], ...update };
          }
        });
      }
    }, 1500);
  }

  // Disconnect from mock WebSocket
  disconnect(): void {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.callback = null;
  }
}