/*
  The MIT License

  Copyright (c) 2017-2021 EclipseSource Munich
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
import React from 'react'
import { showAsRequired, ControlProps, isDescriptionHidden } from '@jsonforms/core'

import { YStack, Label, Paragraph, VisuallyHidden } from 'tamagui'
// import { FormControl, FormHelperText } from '@mui/material';
import merge from 'lodash/merge'
import { useFocus } from '../util'

export interface WithInput {
  input: any
}

export const TamaguiInputControl = (props: ControlProps & WithInput) => {
  const [focused, onFocus, onBlur] = useFocus()
  const { id, description, errors, label, uischema, visible, required, config, input } = props
  const isValid = errors.length === 0
  const appliedUiSchemaOptions = merge({}, config, uischema.options)

  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription
  );

  const firstFormHelperText = showDescription
    ? description
    : !isValid
    ? errors
    : null;
  const secondFormHelperText = showDescription && !isValid ? errors : null;
  const InnerComponent = input

  return (
    <YStack>
      <Label htmlFor={id + '-input'} color={!isValid ? '$red10Light' : ''}>
        {label} {required && '*'}
      </Label>
      <InnerComponent {...props} id={id + '-input'} isValid={isValid} visible={visible} />
      <VisuallyHidden visible={!isValid && !showDescription}>
        <Paragraph size="$2" fow="500" >
          {firstFormHelperText}
        </Paragraph>
      </VisuallyHidden>
      <VisuallyHidden visible={!isValid}>
        <Paragraph size="$2" fow="500" color="$red10Light">
          {secondFormHelperText}
        </Paragraph>
      </VisuallyHidden>
    </YStack>
  )
}
