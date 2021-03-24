/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import battlefieldConfig from 'config/constants/battlefield'
import fetchBattlefield from './fetchBattlefield'
import {
  fetchBattlefieldUserEarnings,
  fetchBattlefieldUserAllowances,
  fetchBattlefieldUserTokenBalances,
  fetchBattlefieldUserStakedBalances,
  fetchBattlefieldUserArmyStrength
} from './fetchBattlefieldUser'
import { BattlefieldState, Battlefield } from '../types'

const initialState: BattlefieldState = { data: [...battlefieldConfig] }

export const battlefieldSlice = createSlice({
  name: 'Battlefield',
  initialState,
  reducers: {
    setBattlefieldPublicData: (state, action) => {
      const liveBattlefieldData: Battlefield[] = action.payload
      state.data = state.data.map((battlefield) => {
        const liveBFData = liveBattlefieldData.find((f) => f.pid === battlefield.pid)
        return { ...battlefield, ...liveBFData }
      })
    },
    setBattlefieldUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setBattlefieldPublicData, setBattlefieldUserData } = battlefieldSlice.actions

// Thunks
export const fetchBattlefieldPublicDataAsync = () => async (dispatch) => {
  const battlefield = await fetchBattlefield()
  dispatch(setBattlefieldPublicData(battlefield))
}
export const fetchBattlefieldUserDataAsync = (account) => async (dispatch) => {
  const userBattlefieldAllowances = await fetchBattlefieldUserAllowances(account)
  const userBattlefieldTokenBalances = await fetchBattlefieldUserTokenBalances(account)
  const userStakedBalances = await fetchBattlefieldUserStakedBalances(account)
  const userBattlefieldEarnings = await fetchBattlefieldUserEarnings(account)
  const userArmyStrength = await fetchBattlefieldUserArmyStrength(account)

  const arrayOfUserDataObjects = userBattlefieldAllowances.map((battlefieldAllowance, index) => {
    return {
      index,
      allowance: userBattlefieldAllowances[index],
      tokenBalance: userBattlefieldTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userBattlefieldEarnings[index],
      userArmyStrength: userArmyStrength[index]
    }
  })

  dispatch(setBattlefieldUserData({ arrayOfUserDataObjects }))
}

export default battlefieldSlice.reducer
