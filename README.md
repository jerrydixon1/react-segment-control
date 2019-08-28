## Installation

1. `npm install react-segment-control`
2. Import the component into your project:
   ```import SegmentedControl from 'react-segment-control'```

## Available Scripts

In the project directory, you can run:

### `npm run storybook`

Starts the storybook for this component

### `npm test`

Launches the jest/enzyme tests

## Usage

A simple example:

```
const options = [{ label: 'Option 1', value: 'option_1' }, { label: 'Option 2', value: 'option_2'}]
const handleSelect = val => console.log(val)

return <SegmentedControl options={options} onSelect={handleSelect} />
```

**(Recommended)** Options can have keys included, for better tracking in the loop
```
const options = [{ 
  label: 'True', 
  value: { flag: true },
  key: 'true_opt' 
}, { 
  label: 'False', 
  value: { flag: false },
  key: 'false_opt'
}]
const handleSelect = val => console.log(val)

return <SegmentedControl options={options} onSelect={handleSelect} />
```

Labelling can also be done with a `labeller` function that takes an option's value as input.
```
const options = [{ value: 1 }, { value: 2 }]
return <SegmentedControl options={options} labeller={value => `Option ${value}`}>
```

Options can be uncheckable using the `uncheckable` prop.
```
return <SegmentedControl options={options} uncheckable />
```

Individual options can be disabled by adding a `disabled` flag to an option.
```
const options = [{ label: 'Option 1', value: 'option_1', disabled: true }, { label: 'Option 2', value: 'option_2'}]
const handleSelect = val => console.log(val)

return <SegmentedControl options={options} onSelect={handleSelect} />
```

Options can be pre-selected in a variety of ways using the `preselect` prop.
```
const options = [{
  label: 'Option 1',
  value: 'option 1',
  key: 'opt_1'
}, {
  label: 'Option 2',
  value: 'option 2',
  key: 'opt_2'
}]

// preselect by array index of options
<SegmentedControl options={options} preselect={ {index: 1} }>

// preselect by key
<SegmentedControl options={options} preselect={ {key: 'opt_1'} }>

// preselect by value (this works for objects too, so long as their JSON.stringify results are the same)
<SegmentedControl options={options} preselect={ {value: 'option 1'} }>

// preselect by entire option (under the hood this tries key comparison if keys are provided, and value comparison as a fallback)
<SegmentedControl options={options} preselect={options[0]}>
```