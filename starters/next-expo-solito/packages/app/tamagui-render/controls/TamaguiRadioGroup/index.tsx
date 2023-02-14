import { ControlProps, isDescriptionHidden, OwnPropsOfEnum } from '@jsonforms/core'
import { XStack } from '@my/ui/types'
import merge from 'lodash/merge'
import React from 'react'
import { View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { Text } from 'tamagui';
import { useFocus } from '../../util'

export const TamaguiRadioGroup = (props: ControlProps & OwnPropsOfEnum) => {
  const [focused, onFocus, onBlur] = useFocus()
  const [checked, setChecked] = React.useState('first');
  const {
    config,
    id,
    label,
    required,
    description,
    errors,
    data,
    visible,
    options,
    handleChange,
    path,
    enabled,
  } = props
  const isValid = errors.length === 0
  const appliedUiSchemaOptions = merge({}, config, props.uischema.options)
  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription
  )
  const onChange = (value: any) => handleChange(path, value)

  return (
    <XStack>
      <View>
        <RadioButton.Group
          onValueChange={onChange}
          value={props.data ?? ''}
        >
          {options!.map((option) => (
          <View>
            <Text>{option.label}</Text>
            <RadioButton
              value={option.value}
              // status={data === option.value ? 'checked' : 'unchecked'}
              disabled={!enabled}
            />
          </View>
        ))}
        </RadioButton.Group>
        
        <RadioButton
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
        <RadioButton
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('second')}
        />
      </View>
    </XStack>
  )
}
