import {
  ControlProps,
  isDateTimeControl,
  isDescriptionHidden,
  RankedTester,
  rankWith,
} from '@jsonforms/core'
import { withJsonFormsControlProps } from '@jsonforms/react'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import merge from 'lodash/merge'
import React, { useMemo } from 'react'
import { Platform } from 'react-native'
import { YStack } from 'tamagui'

import { createOnChangeHandler, getData, useFocus } from '../../util'

export const TamaguiDateTimeControl = (props: ControlProps) => {
  const [focused, onFocus, onBlur] = useFocus()
  const {
    description,
    id,
    errors,
    label,
    uischema,
    visible,
    enabled,
    required,
    path,
    handleChange,
    data,
    config,
  } = props
  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  const saveFormat = appliedUiSchemaOptions.dateTimeSaveFormat ?? undefined

  const onChange = useMemo(
    () => createOnChangeHandler(path, handleChange, saveFormat),
    [path, handleChange, saveFormat]
  )

  const value = getData(data, saveFormat)

  return (
    <YStack>
      <DateTimePicker
        value={value?.toDate()! || new Date()}
        mode="datetime"
        onChange={(ev, date) => {
          onChange(dayjs(date!), 'Invalid Date')
        }}
        // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        // style={{ height: Platform.OS === 'ios' ? 90 : 50 }}
        disabled={!enabled}
      />
    </YStack>
  )
}

export const tamaguiDateTimeControlTester: RankedTester = rankWith(2, isDateTimeControl)

export default withJsonFormsControlProps(TamaguiDateTimeControl)
