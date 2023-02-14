import { ControlProps, isDescriptionHidden, OwnPropsOfEnum } from '@jsonforms/core'
import { XStack } from 'tamagui'
import merge from 'lodash/merge'
import React from 'react'
import { View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { Label } from 'tamagui'
import { useFocus } from '../../util'

export const TamaguiRadioGroup = (props: ControlProps & OwnPropsOfEnum) => {
  const [focused, onFocus, onBlur] = useFocus()
  const [checked, setChecked] = React.useState('first')
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
      <RadioButton.Group onValueChange={onChange} value={props.data ?? ''}>
        <XStack>
          {options!.map((option) => (
            <XStack justifyContent="center" alignItems="center">
                <Label>{option.label}</Label>
                <RadioButton.Android
                  value={option.value}
                  disabled={!enabled}
                  style={{
                    borderWidth: 1
                  }}
                />
            </XStack>
          ))}
        </XStack>
      </RadioButton.Group>
    </XStack>
  )
}
