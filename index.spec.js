// Configure tests
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Imports
import React from 'react'
import { render } from 'enzyme'
import renderer from 'react-test-renderer'

import SegmentedControl from './index'
configure({ adapter: new Adapter() });

const mockOptions = [{
  label: 'Option 1',
  value: 'option_1'
}, {
  label: 'Option 2',
  value: 'option_2'
}, {
  label: 'Option 3',
  value: 'option_3'
}]

describe('SegmentedControl', () => {

  it('should render 3 radio inputs for 3 options', () => {
    const component = render(<SegmentedControl options={mockOptions} />)
    expect(component.find('input').length).toEqual(3)
  })

  it('should correctly set input to checked for preselecting by index', () => {
    const component = render(<SegmentedControl options={mockOptions} preselect={{index: 0}} />)
    expect(component.find('input')[0].attribs.checked).toBeDefined()
  })

  it('should correctly set input to checked for preselecting by key', () => {
    const keyOptions = mockOptions.map((option, i) => ({ key: `option-${i}`, ...option }))
    const component = render(<SegmentedControl options={keyOptions} preselect={{key: 'option-1'}} />)
    expect(component.find('input')[1].attribs.checked).toBeDefined()
  })

  it('should correctly set input to checked for preselecting by value', () => {
    const component = render(<SegmentedControl options={mockOptions} preselect={{value: 'option_1'}} />)
    expect(component.find('input')[0].attribs.checked).toBeDefined()
  })

  it('should correctly set input to checked for preselecting by option', () => {
    const component = render(<SegmentedControl options={mockOptions} preselect={mockOptions[2]} />)
    expect(component.find('input')[2].attribs.checked).toBeDefined()
  })

  it('should disable correctly for disabled options', () => {
    const options = mockOptions.map(option => ({...option}))
    options[options.length - 1].disabled = true
    const component = render(
      <SegmentedControl options={options} />
    )
    expect(component.find('input')[options.length - 1].attribs.disabled).toBeDefined()
  })

})