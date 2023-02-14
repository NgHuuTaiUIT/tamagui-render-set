
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

  return appliedUiSchemaOptions.autocomplete === false ? (
    <TamaguiInputControl {...props} input={TamaguiSelect} />
  ) : (
    <TamaguiInputControl {...props} input={TamaguiSelect} />
  )
}

export const tamaguiEnumControlTester: RankedTester = rankWith(2, isEnumControl)

// HOC order can be reversed with https://github.com/eclipsesource/jsonforms/issues/1987
export default withJsonFormsEnumProps(withTranslateProps(React.memo(TamaguiEnumControl)), false)
