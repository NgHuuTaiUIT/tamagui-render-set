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
import React, { useCallback } from 'react'
import {
  ControlProps,
  showAsRequired,
  isDescriptionHidden,
  isRangeControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core'
import { withJsonFormsControlProps } from '@jsonforms/react'

import { FormControl, FormHelperText, FormLabel, Hidden, Slider, Typography } from '@mui/material'
import { Label, Paragraph, Slider as Slider2, SliderProps, Spacer, VisuallyHidden, XStack, styled } from 'tamagui'
import merge from 'lodash/merge'
import { useFocus } from '../util'


export const TamaguiSliderControl = (props: ControlProps) => {
  const [focused, onFocus, onBlur] = useFocus()
  const {
    id,
    data,
    description,
    enabled,
    errors,
    label,
    schema,
    handleChange,
    visible,
    path,
    required,
    config,
  } = props
  const isValid = errors.length === 0
  const appliedUiSchemaOptions = merge({}, config, props.uischema.options)
  const labelStyle = {
    overflow: 'hidden',
    width: '100%'
  }
 
  const rangeItemStyle: { [x: string]: any } = {
    flexGrow: '1',
  }
  const sliderStyle: { [x: string]: any } = {
    marginTop: '7px',
  }

  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription
  )

  const onChange = useCallback(
    (value: any) => handleChange(path, Number(value)),
    [path, handleChange]
  )

  return (
    <Hidden xsUp={!visible}>
        <Label htmlFor={id} color={!isValid ? '$red10Light' : ''} style={labelStyle}>
          {label} {required && '*'}
        </Label>
        <XStack justifyContent='space-between'>
          <Label htmlFor={id} color={!isValid ? '$red10Light' : ''} fontSize='$1'>
            {schema.minimum}
          </Label>
          <Label htmlFor={id} color={!isValid ? '$red10Light' : ''} fontSize='$1'>
            {schema.maximum}
          </Label>
        </XStack>
        <Slider2
          id={id + '-input'}
          defaultValue={[50]}
          value={[Number(data || schema.default)]}
          min={schema.minimum}
          max={schema.maximum}
          step={schema.multipleOf || 1}
          disabled={!enabled}
          onValueChange={onChange}
          {...props}
        >
          <Slider2.Track>
            <Slider2.TrackActive />
          </Slider2.Track>
          <Slider2.Thumb bordered circular elevate index={0} size="$2"/>
        </Slider2>
        <VisuallyHidden visible={!isValid}>
          <Paragraph size="$2" fow="500" >
          {!isValid ? errors : showDescription ? description : null}
          </Paragraph>
        </VisuallyHidden>
    </Hidden>
  )
}
export const tamaguiSliderControlTester: RankedTester = rankWith(4, isRangeControl)

export default withJsonFormsControlProps(TamaguiSliderControl)
