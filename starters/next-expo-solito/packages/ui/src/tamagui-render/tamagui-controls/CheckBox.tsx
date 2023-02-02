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
import { Label, Separator, Switch, XStack, Stack, Button, styled } from 'tamagui'
import merge from 'lodash/merge'
import { CheckSquare, Check } from '@tamagui/lucide-icons'
export const TamaguiCheckBox = React.memo((props: CellProps & WithClassname) => {
  const { data, className, id, enabled, uischema, path, handleChange, config } = props

  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  const checked = !!data
  const CustomSwitch = styled(Switch, {
    maw: 27,
    mah: 20,
  })
  return (
    <XStack miw={200} ai="center" space="$4" my="$4">
      {uischema.label && (
        <Label pr="$0" miw={90} jc="flex-end" size="$3" htmlFor={id}>
          {uischema.label}
        </Label>
      )}
      <CustomSwitch
        id={id}
        size="$3"
        className={className}
        disabled={!enabled}
        checked={checked}
        onCheckedChange={(isChecked) => handleChange(path, isChecked)}
      >
        {checked && <Check size="$2" color="white" />}
      </CustomSwitch>
    </XStack>
  )
})
