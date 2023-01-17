/*
  The MIT License

  Copyright (c) 2018-2020 EclipseSource Munich
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
import {
  ControlProps,
  isEnumControl,
  OwnPropsOfEnum,
  RankedTester,
  rankWith,
} from '@jsonforms/core'
import { TranslateProps, withJsonFormsEnumProps, withTranslateProps } from '@jsonforms/react'
import { TamaguiSelect } from '../tamagui-controls/Select'
import merge from 'lodash/merge'
import { TamaguiInputControl } from './TamaguiInputControl'
// import { MuiAutocomplete, WithOptionLabel } from '../mui-controls/MuiAutocomplete';

export const TamaguiEnumControl = (
  props: ControlProps & OwnPropsOfEnum 
  // & WithOptionLabel 
  & TranslateProps
) => {
  const { config, uischema, errors } = props
  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  const isValid = errors.length === 0
  console.log("enum")

  return appliedUiSchemaOptions.autocomplete === false ? (
    <TamaguiInputControl {...props} input={TamaguiSelect} />
  ) : (
    <TamaguiInputControl {...props} input={TamaguiSelect} />
  )
}

export const tamaguiEnumControlTester: RankedTester = rankWith(2, isEnumControl)

// HOC order can be reversed with https://github.com/eclipsesource/jsonforms/issues/1987
export default withJsonFormsEnumProps(withTranslateProps(React.memo(TamaguiEnumControl)), false)
