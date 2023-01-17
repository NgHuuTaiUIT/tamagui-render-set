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
import React, { useMemo } from 'react';
import { EnumCellProps, WithClassname } from '@jsonforms/core';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { Adapt, Select, Sheet, LinearGradient, YStack } from 'tamagui';
import merge from 'lodash/merge';
import { TranslateProps } from '@jsonforms/react';
import { i18nDefaults } from '../util';

export const TamaguiSelect = React.memo((props: EnumCellProps & WithClassname & TranslateProps) => {
  const {
    data,
    className,
    id,
    enabled,
    schema,
    uischema,
    path,
    handleChange,
    options,
    config,
    t
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const noneOptionLabel = useMemo(() => t('enum.none', i18nDefaults['enum.none'], { schema, uischema, path}), [t, schema, uischema, path]);

  return (
    <Select
      id={id}
      value={data !== undefined ? data : ''}
      onValueChange={vl =>handleChange(path, vl || undefined)}
    >
      <Select.Trigger w={180} iconAfter={ChevronDown}>
        <Select.Value placeholder="Something" />
      </Select.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>
      <Select.Content zIndex={200_000}>
        <Select.ScrollUpButton ai="center" jc="center" pos="relative" w="100%" h="$3">
          <YStack zi={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', '$backgroundTransparent']}
            br="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {options.map((item, i) => {
              return (
                <Select.Item index={i} key={item.value} value={item.value.toLowerCase()}>
                  <Select.ItemText>{item.value}</Select.ItemText>
                  <Select.ItemIndicator ml="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              )
            })}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton ai="center" jc="center" pos="relative" w="100%" h="$3">
          <YStack zi={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$backgroundTransparent', '$background']}
            br="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
      {/* {[<MenuItem value={''} key='jsonforms.enum.none'><em>{noneOptionLabel}</em></MenuItem>].concat(
        options.map(optionValue => (
          <MenuItem value={optionValue.value} key={optionValue.value}>
            {optionValue.label}
          </MenuItem>
        ))
      )} */}
    </Select>
  );
});
