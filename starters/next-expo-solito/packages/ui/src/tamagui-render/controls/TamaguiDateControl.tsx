/*
  The MIT License
  
  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import merge from 'lodash/merge'
import React, { createElement, useMemo, useState } from 'react'
import {
  ControlProps,
  isDateControl,
  isDescriptionHidden,
  RankedTester,
  rankWith,
} from '@jsonforms/core'
import { withJsonFormsControlProps } from '@jsonforms/react'
import { YStack, Text } from 'tamagui'
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { format } from 'date-fns'
// import { DayPicker } from 'react-day-picker'
// import DatePicker from 'react-native-date-picker'
// import DateTimePicker from '@react-native-community/datetimepicker';
import {
  ResettableTextField,
  createOnChangeHandler,
  getData,
  // ResettableTextField,
  useFocus,
} from '../util'
import { BrowserView, MobileView } from 'react-device-detect'
import { MobileDatePicker, DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { FormHelperText, Hidden } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const MyWebDatePicker = ({
  date,
  onChange,
}: {
  date: Date
  onChange: (time: Date, textInputValue: string) => void
}) => {
  return createElement('input', {
    type: 'date',
    value: date?.toISOString().split('T')[0],
    onChange: (event: any) => {
      onChange(new Date(event.target.value), 'Invalid Date')
    },
    style: { height: 30, padding: 5, border: '2px solid #677788', borderRadius: 5, width: 250 },
  })
}
import { Platform, StyleSheet } from 'react-native'

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

  const firstFormHelperText = showDescription ? description : !isValid ? errors : null
  const secondFormHelperText = showDescription && !isValid ? errors : null
  const onChange = useMemo(
    () => createOnChangeHandler(path, handleChange, saveFormat),
    [path, handleChange, saveFormat]
  )

  const value = getData(data, saveFormat)
  const valueInInputFormat = value ? value.format(format) : ''

  let deviceType
  if (Platform.OS === 'web') {
    deviceType = 'Mobile'
  } else {
    deviceType = 'Desktop'
  }

  return (
    //   <MobileView>
    //   <DateTimePicker
    //     // date={value?.toDate()!}
    //     // mode="date"
    //     // onDateChange={(date) => onChange(date, 'Invalid Date')}
    //     // open={enabled}
    //     value={value?.toDate()!}
    //     mode='datetime'
    //     onChange={(ev, date) => onChange(date!, 'Invalid Date')}
    //     disabled={!enabled}
    //   />
    // </MobileView>
    //   <MyWebDatePicker
    //     date={value?.toDate()!}
    //     onChange={onChange}
    //   />
    <YStack>
      {/* <MobileView>
        <DateTimePicker
          // date={value?.toDate()!}
          // mode="date"
          // onDateChange={(date) => onChange(date, 'Invalid Date')}
          // open={enabled}
          value={value?.toDate()!}
          mode="datetime"
          onChange={(ev, date) => onChange(date!, 'Invalid Date')}
          disabled={!enabled}
        />
      </MobileView> */}
      {deviceType === 'Mobile' ? (
        <></>
      ) : (
        <Hidden xsUp={!visible}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={label}
              value={value}
              onChange={onChange}
              inputFormat={format}
              disableMaskedInput
              views={views}
              disabled={!enabled}
              componentsProps={{
                actionBar: {
                  actions: (variant) =>
                    variant === 'desktop' ? [] : ['clear', 'cancel', 'accept'],
                },
              }}
              renderInput={(params) => (
                <ResettableTextField
                  {...params}
                  rawValue={data}
                  dayjsValueIsValid={value !== null}
                  valueInInputFormat={valueInInputFormat}
                  focused={focused}
                  id={id + '-input'}
                  required={required && !appliedUiSchemaOptions.hideRequiredAsterisk}
                  autoFocus={appliedUiSchemaOptions.focus}
                  error={!isValid}
                  fullWidth={!appliedUiSchemaOptions.trim}
                  inputProps={{
                    ...params.inputProps,
                    type: 'text',
                    color: 'white',
                  }}
                  style={{
                    color: 'white',
                    borderColor: 'white',
                  }}
                  InputLabelProps={data ? { shrink: true } : undefined}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  variant={'standard'}
                />
              )}
            />
            <FormHelperText error={!isValid && !showDescription}>
              {firstFormHelperText}
            </FormHelperText>
            <FormHelperText error={!isValid}>{secondFormHelperText}</FormHelperText>
          </LocalizationProvider>
        </Hidden>
      )}
    </YStack>
  )
}

export const tamaguiDateControlTester: RankedTester = rankWith(4, isDateControl)

export default withJsonFormsControlProps(TamaguiDateControl)
