import {
  ControlProps,
  isDescriptionHidden,
  isTimeControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core'
import { withJsonFormsControlProps } from '@jsonforms/react'
import { FormHelperText, Hidden } from '@mui/material'
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { color } from '@tamagui/theme-base'
import merge from 'lodash/merge'
import React, { createElement, useEffect, useMemo, useState } from 'react'
import { isWeb, YStack } from 'tamagui'

import { createOnChangeHandler, getData, ResettableTextField, useFocus } from '../util'

export const TamaguiTimeControl = (props: ControlProps) => {
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

  const format = appliedUiSchemaOptions.timeFormat ?? 'HH:mm'
  const saveFormat = appliedUiSchemaOptions.timeSaveFormat ?? 'HH:mm:ss'

  const views = appliedUiSchemaOptions.views ?? ['hours', 'minutes']

  const firstFormHelperText = showDescription ? description : !isValid ? errors : null
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

  const renderDatePicker = () => {
    if (isWeb) {
      return (
        <Hidden xsUp={!visible}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label={label}
              value={value}
              onChange={onChange}
              inputFormat={format}
              disableMaskedInput
              ampm={!!appliedUiSchemaOptions.ampm}
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
                  }}
                  sx={{
                    color: 'aqua',
                    input: intputStyle,
                    svg: svgStyle,
                    label: labeStyle,
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
      )
    } else {
      //TODO: render TamaguiDateMobile
      // return <TamaguiDateMobile {...props}/>
    }
  }

  return <YStack>{renderDatePicker()}</YStack>
}

export const tamaguiTimeControlTester: RankedTester = rankWith(4, isTimeControl)

export default withJsonFormsControlProps(TamaguiTimeControl)
