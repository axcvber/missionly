import { create } from 'zustand'

interface OrganizationState {
  isSwitching: boolean
  setIsSwitching: (isLoading: boolean) => void
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
  isSwitching: false,
  setIsSwitching: (isSwitching) => set({ isSwitching }),
}))
