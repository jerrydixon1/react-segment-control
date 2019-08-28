import styled from 'styled-components'
import colors from './common/colors'

export const SegmentedControlList = styled.div`
  display: inline-flex;
  font-family: sans-serif;
`

export const SegmentedControlInputWrap = styled.label`
  padding: 16px;
  background: ${colors.white};
  color: ${colors.textDefault};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border: 1px solid ${colors.borderDefault};
  border-right: 0;
  &:hover {
    cursor: pointer;
    background: ${colors.backgroundOffwhite};
  }
  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-right: 1px solid ${colors.borderDefault};
  }
  ${props => props.isChecked && `
    &, &:hover, &:last-child {
      color: white;
      background: ${colors.backgroundBlue};
      border-color: ${colors.backgroundBlue};
    }
  `}

  ${props => props.isDisabled && `
    &, &:hover {
      opacity: .7;
      cursor: not-allowed;
      background: ${colors.backgroundOffwhite};
      color: ${colors.textDefault};
    }
    input:hover {
      cursor: not-allowed;
    }
  `}

  /* This is better than display: none for accessibility purposes */
  input {
    position:fixed;
    opacity:0;
    cursor: pointer;
  }
`