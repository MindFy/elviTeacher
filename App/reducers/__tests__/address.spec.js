import address from './address'
import { ADD_UPDATE_REQUEST } from '../constants/index'
import {
  common,
} from '../constants/common'

describe('main', () => {
  const initialState = {
    address: [],
    remark: '',
    withdrawaddr: '',
    selectedIndex: undefined,
    selectedToken: common.selectedTokenDefault,
    tokenListSelected: false,
    addVisible: false,
    addResponse: undefined,
    findAddressVisible: false,
    findAddressResponse: undefined,
  }
  it('should not accept ADD_UPDATE_REQUEST___', () => {
    const mockAction = {
      type: 'ADD_UPDATE_REQUEST___',
    }
    expect(address(initialState, mockAction)).toBe(initialState)
  })

  it('should accept ADD_UPDATE_REQUEST', () => {
    const mockAction = {
      type: ADD_UPDATE_REQUEST,
      data: {
        remark: '123',
        withdrawaddr: '0x010010101',
      },
    }
    expect(address(initialState, mockAction)).toEqual({
      address: [],
      remark: '123',
      withdrawaddr: '0x010010101',
      selectedIndex: undefined,
      selectedToken: common.selectedTokenDefault,
      tokenListSelected: false,
      addVisible: false,
      addResponse: undefined,
      findAddressVisible: false,
      findAddressResponse: undefined,
    })
  })
})
