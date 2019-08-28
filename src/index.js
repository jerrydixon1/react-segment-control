import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SegmentedControlList, SegmentedControlInputWrap } from './style'
import Utils from '../common/utils'

/**
 * A radio button group component, acting as native radio inputs under the hood
 * but displaying as a list of buttons
 */
class SegmentedControl extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      options: props.options || [],
      selectedOption: undefined,
    }

    if(this.props.preselect) {
      // Attempt to preselect an option
      const { key, index, value } = this.props.preselect

      let option
      if(typeof key !== 'undefined') {
        option = Utils.findByKey(this.state.options, key)
      }
      if(!option && typeof index !== 'undefined') {
        option = Utils.findByIndex(this.state.options, index)
      }
      if(!option && typeof value !== 'undefined') {
        option = Utils.findByValue(this.state.options, value)
      }
      if(option) {
        this.state.selectedOption = option
        this.propagateChanges(option.value)
      }
    }
  }

  /**
   * Helper function for sending changes to the parent component
   * @param {*} value The value to pass to the parent
   */
  propagateChanges(value) {
    if(typeof this.props.onSelect === 'function') {
      this.props.onSelect(value)
    }
  }

  /**
   * Change handler for the radio inputs
   * @param {*} e 
   */
  handleChange(e) {
    // Set the new option and relay the new option value to the parent
    const option = Utils.findByIndex(this.props.options, e.target.value)
    if(option) {
      this.setState({ selectedOption: option })
      this.propagateChanges(option.value)
    }
  }

  /**
   * Click handler for the radio inputs.
   * If uncheckable prop is set, this function handles unchecking inputs
   * @param {*} e 
   */
  handleClick(e) {
    // Unselect if the uncheckable property was passed 
    // and relay the change to the parent
    const option = Utils.findByIndex(this.props.options, e.target.value)

    if(option && this.state.selectedOption === option && this.props.uncheckable) {
      this.setState({ selectedOption: undefined })
      this.propagateChanges(undefined)
    }
  }

  /**
   * This function attempts to correctly maintain the selectedOption value if props.options changes.
   * For example, if state.selectedOption is set and a new option is pushed to the props.options array, this is how
   * state.selectedOption maintains its value during re-render
   * 
   * @param {*} nextProps 
   * @param {*} state 
   */
  static getDerivedStateFromProps(nextProps, state) {
    if(state.selectedOption && nextProps.options && nextProps.options.length && nextProps.options !== state.options) {

      // First, try to utilize keys if state.selectedOption contains one
      let newSelectedOption = (state.selectedOption.key && Utils.findByKey(nextProps.options, state.selectedOption.key))

      // If an option could not be found by key, try finding by value.
      if(!newSelectedOption) {
        newSelectedOption = Utils.findByValue(nextProps.options, state.selectedOption.value)
      }

      if(newSelectedOption) {
        return {
          selectedOption: newSelectedOption
        }
      }
    }
    return null
  }
  
  render() {

    // Render null if no options are provided
    if(!this.state.options || !this.state.options.length) {
      console.warn('Warning: attempted to use SegmentedControl component with no options provided.')
      return null
    }

    return (
      <SegmentedControlList>
        {this.props.options.map((option, i) => {
          return (
            <SegmentedControlInputWrap key={option.key || i} isChecked={option === this.state.selectedOption}  isDisabled={option.disabled}>
              <input 
                type="radio"
                value={i}
                checked={option === this.state.selectedOption} 
                disabled={option.disabled}
                onChange={this.handleChange.bind(this)}
                onClick={this.handleClick.bind(this)}
              />
              {(
                option.label || 
                (typeof this.props.labeller === 'function' && this.props.labeller(option.value)) || 
                option.value.toString()
              )}
            </SegmentedControlInputWrap>
          )
        })}
      </SegmentedControlList>
    )
  }
}

SegmentedControl.propTypes = {
  /** 
     * Array of option objects for the radio group. Required 
     * 
     * @param {Array}   options             The array of options
     * @param {*}       options[i].value    An option's value. Required
     * @param {string}  options[i].label    The label to show for a given option. Optional. Defaults to use a labeller function or value.toString if not provided.
     * @param {*}       options[i].key      The list key to use for options. Optional, defaults to array index
     * @param {boolean} options[i].disabled Flag denoting if an option is disabled. Optional
     */
    options: PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
      if(!propValue[key] || typeof propValue[key].value === 'undefined') {
        const optionProvided = typeof propValue[key] === 'object' ? JSON.stringify(propValue[key]) : propValue[key]
        return new Error(`Invalid prop ${propFullName}: ${propFullName}.value is required. Option provided: ${optionProvided}`)
      }
    }),

    /**
     * Preselected option. Optional
     * 
     * @param {Object}        preselect The preselect object. Tries to preselect by key, index, or value, in that order.
     * @param {string|number} preselect.key   The key to use for preselecting
     * @param {number}        preselect.index The array index to use for preselecting
     * @param {*}             preselect.value The value to preselect by
     */
    preselect: PropTypes.objectOf(function (propValue, key, componentName, location, propFullName) {
      if(propValue && typeof propValue.key === 'undefined' && typeof propValue.index === 'undefined' && typeof propValue.value === 'undefined') {
        const optionProvided = typeof propValue === 'object' ? JSON.stringify(propValue) : propValue
        return new Error(`Invalid prop ${propFullName}: a key, index, or value property is required. Got: ${optionProvided}`)
      }
    }),

    /**
     * Function that takes in the option value and can be used for dynamically labelling options. Optional
     */
    labeller: PropTypes.func,

    /** Flag denoting if the radio buttons are uncheckable */
    uncheckable: PropTypes.bool
}

export default SegmentedControl