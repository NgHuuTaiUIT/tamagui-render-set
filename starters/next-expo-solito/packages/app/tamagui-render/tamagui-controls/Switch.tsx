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
import { CellProps, WithClassname } from '@jsonforms/core'
import { Label, Separator, Switch, XStack, TamaguiComponentPropsBase } from 'tamagui'
import merge from 'lodash/merge'

export const TamaguiSwitch = React.memo((props: CellProps & WithClassname) => {
  const { data, className, id, enabled, uischema, path, handleChange, config } = props
  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  const inputProps = { autoFocus: !!appliedUiSchemaOptions.focus }
  const checked = !!data

  return (
    <XStack miw={200} ai="center" space="$4">
      <Label pr="$0" miw={90} jc="flex-end" size="$3" htmlFor={id} numberOfLines={1}>
        {uischema.label}
      </Label>
      <Separator mih={20} vertical />
      <Switch
        id={id}
        size="$3"
        className={className}
        disabled={!enabled}
        checked={checked}
        onCheckedChange={(isChecked) => handleChange(path, isChecked)}
      >
        <Switch.Thumb animation="quick" />
      </Switch>
    </XStack>
    // <Switch
    //   checked={checked}
    //   // onChange={(_ev, isChecked) => handleChange(path, isChecked)}
    //   on
    //   className={className}
    //   id={id}
    //   disabled={!enabled}
    //   // inputProps={inputProps}
    // />
  )
})
