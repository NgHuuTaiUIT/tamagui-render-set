import {
  ControlProps,
  RankedTester,
  isDateControl,
  isDescriptionHidden,
  rankWith,
} from '@jsonforms/core'
import { withJsonFormsControlProps } from '@jsonforms/react'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import merge from 'lodash/merge'
import { createElement, useMemo } from 'react'
import { Platform } from 'react-native'

import { createOnChangeHandler, getData, useFocus } from '../../util'
import {YStack} from 'tamagui'

export const TamaguiDateControl = (props: ControlProps) => {
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
  const isValid = errors.length === 0
  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription
  )

  const format = appliedUiSchemaOptions.dateFormat ?? 'YYYY-MM-DD'
  const saveFormat = appliedUiSchemaOptions.dateSaveFormat ?? 'YYYY-MM-DD'

  const views = appliedUiSchemaOptions.views ?? ['year', 'day']

  const secondFormHelperText = showDescription && !isValid ? errors : null
  const onChange = useMemo(
    () => createOnChangeHandler(path, handleChange, saveFormat),
    [path, handleChange, saveFormat]
  )

  const value = getData(data, saveFormat)
  const valueInInputFormat = value ? value.format(format) : ''

  const intputStyle = {
    color: 'white',
    background: '#1111',
    // fontFamily: size.
  }

  const labeStyle = {
    color: 'white',
    fontSize: '15px',
  }

  const svgStyle = {
    color: 'white',
  }

  return (
    <YStack>
      <DateTimePicker
        value={value?.toDate()! || new Date()}
        mode="date"
        onChange={(ev, date) => onChange(dayjs(date!), 'Invalid Date')}
        // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        style={{ height: Platform.OS === 'ios' ? 90 : 50 }}
        disabled={!enabled}
      />
    </YStack>
  )
}

export const tamaguiDateControlTester: RankedTester = rankWith(4, isDateControl)

export default withJsonFormsControlProps(TamaguiDateControl)
