import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import SegmentedControl from './index';

const normalOptions = [{ label: 'All', value: 'all'}, { label: 'Male', value: 'male' }, { label: 'Female', value: 'female'}]

storiesOf('SegmentedControl', module)
.add('Normal options', () => {
  return <SegmentedControl options={normalOptions} onSelect={action('handleSelect')} />
})

storiesOf('SegmentedControl', module)
.add('Interesting options', () => {
  const options = [{ label: 'Fish count', value: [1, 2, 'red', 'blue']}, { label: 'Hulk', value: { action: 'SMASH!' } }, { label: 'Symbolic', value: Symbol('https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols') }]
  return <SegmentedControl options={options} onSelect={action('handleSelect')} />
})

storiesOf('SegmentedControl', module)
.add('Uncheckable options', () => {
  return <SegmentedControl options={normalOptions} onSelect={action('handleSelect')} uncheckable />
})

storiesOf('SegmentedControl', module)
.add('Single uncheckable option', () => {
  return <SegmentedControl options={[{ label: 'Do the thing?', value: true }]} onSelect={action('handleSelect')} uncheckable />
})

storiesOf('SegmentedControl', module)
.add('Disabled option', () => {
  const options = normalOptions.map(option => {
    return {...option}
  })
  options[options.length - 1].disabled = true
  return <SegmentedControl options={options} onSelect={action('handleSelect')} />
})

storiesOf('SegmentedControl', module)
.add('Preselect by index', () => {
  const preselection = {index: 0}
  return <SegmentedControl options={normalOptions} preselect={preselection} onSelect={action('handleSelect')} />
})

storiesOf('SegmentedControl', module)
.add('Preselect by key', () => {
  const options = normalOptions.map((option, i) => {
    return { 
      key: `option-${i}`,
      ...option
    }
  })
  const preselection = { key: 'option-1' }
  return <SegmentedControl options={options} preselect={preselection} onSelect={action('handleSelect')} />
})

storiesOf('SegmentedControl', module)
.add('Preselect by string value', () => {
  const options = normalOptions.map((option, i) => {
    return { 
      ...option
    }
  })
  options.unshift({ label: 'Preselected string', value: 'Heyyy' })
  const preselection = { value: 'Heyyy' }
  return <SegmentedControl options={options} preselect={preselection} onSelect={action('handleSelect')} />
})

storiesOf('SegmentedControl', module)
.add('Preselect by object value', () => {
  const options = normalOptions.map((option, i) => {
    return { 
      ...option
    }
  })
  options.push({ label: 'Preselected object', value: { test: 'Yo!' } })
  const preselection = { value: { test: 'Yo!' } }
  return <SegmentedControl options={options} preselect={preselection} onSelect={action('handleSelect')} />
})

storiesOf('SegmentedControl', module)
.add('Preselect by option object', () => {
  const options = normalOptions.map((option, i) => {
    return { 
      ...option
    }
  })
  return <SegmentedControl options={options} preselect={options[1]} onSelect={action('handleSelect')} />
})