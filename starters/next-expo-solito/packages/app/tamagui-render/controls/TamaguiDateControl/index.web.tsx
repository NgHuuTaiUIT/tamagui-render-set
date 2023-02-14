/**
 * @deprecated you are importing from the wrong file.
 */
import { ControlProps, isDateControl, isDescriptionHidden, RankedTester, rankWith } from '@jsonforms/core'
import { FormHelperText, Hidden } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import merge from 'lodash/merge'
import React, { createElement, useEffect, useMemo, useState } from 'react'
import { Label } from 'tamagui'
import { useTheme, SizeTokens } from 'tamagui';
import { createOnChangeHandler, getData, ResettableTextField, useFocus } from '../../util'
import { withJsonFormsControlProps } from '@jsonforms/react'

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
  const theme = useTheme()
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

  const dateStyle: React.CSSProperties = {
    border: `1px solid ${theme.borderColor.variable}`,
    padding: `0 10px`,
    borderRadius: 8
  }

  const intputStyle: React.CSSProperties = {
    color: theme.color.variable,
    padding: '10px 0'
  }

  const labeStyle = {
    color: 'white',
    fontSize: '15px',
  }

  const svgStyle = {
    color: 'white',
  }

  return (
    <Hidden xsUp={!visible}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Label>{label}</Label>
        <DatePicker
          // label={label}
          value={value}
          onChange={onChange}
          inputFormat={format}
          disableMaskedInput
          views={views}
          disabled={!enabled}
          componentsProps={{
            actionBar: {
              actions: (variant) => (variant === 'desktop' ? [] : ['clear', 'cancel', 'accept']),
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
              }}
              style={dateStyle}
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
        <FormHelperText error={!isValid && !showDescription}>{firstFormHelperText}</FormHelperText>
        <FormHelperText error={!isValid}>{secondFormHelperText}</FormHelperText>
      </LocalizationProvider>
    </Hidden>
  )
}

export const tamaguiDateControlTester: RankedTester = rankWith(4, isDateControl)

export default withJsonFormsControlProps(TamaguiDateControl)