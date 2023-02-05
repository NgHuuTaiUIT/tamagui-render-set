import { CellProps, WithClassname } from '@jsonforms/core';
import { Check } from '@tamagui/lucide-icons';
import merge from 'lodash/merge';
import React from 'react';
import { Label, styled, Switch, XStack } from 'tamagui';

// import Icon from 'react-native-vector-icons/Ionicons';
export const TamaguiCheckBox = React.memo((props: CellProps & WithClassname) => {
  const { data, className, id, enabled, uischema, path, handleChange, config } = props

  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  const checked = !!data
  const CustomSwitch = styled(Switch, {
    maw: 27,
    mah: 20,
    backgroundColor: checked ? "white" : "$blue11Dark",
  })
  const IconCheck = styled(Check, {
    color: checked ? "black" : "white"
    // stroke: "red",
    // fill: "red",
  })
  return (
    <XStack miw={200} ai="center" space="$4" my="$4">
      {uischema.label && (
        <Label pr="$0" miw={90} jc="flex-end" size="$3" htmlFor={id}>
          {uischema.label}
        </Label>
      )}
      <CustomSwitch
        id={id}
        size="$3"
        className={className}
        disabled={!enabled}
        checked={checked}
        onCheckedChange={(isChecked) => handleChange(path, isChecked)}
      >
        <IconCheck />
      </CustomSwitch>
    </XStack>
  )
})
