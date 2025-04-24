import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoState, CryptoAsset } from '../types/crypto';
import { sampleCryptoData } from '../data/sampleData';
import { RootState } from './store';

const initialState: CryptoState = {
  assets: sampleCryptoData,
  status: 'idle',
  error: null,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<Partial<CryptoAsset>[]>) => {
      action.payload.forEach(update => {
        const assetIndex = state.assets.findIndex(asset => asset.id === update.id);
        if (assetIndex !== -1) {
          state.assets[assetIndex] = {
            ...state.assets[assetIndex],
            ...update,
          };
        }
      });
    },
  },
});

// Actions
export const { updatePrices } = cryptoSlice.actions;

// Selectors
export const selectAllAssets = (state: RootState) => state.crypto.assets;
export const selectAssetById = (state: RootState, id: string) => 
  state.crypto.assets.find(asset => asset.id === id);

export default cryptoSlice.reducer;