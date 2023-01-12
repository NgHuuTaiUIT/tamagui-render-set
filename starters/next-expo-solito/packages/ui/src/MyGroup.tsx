import { TamaguiLayoutRenderer } from './tamagui-render/util'
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Hidden,
//   Typography
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import { JsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react'
import { rankWith, uiTypeIs } from '@jsonforms/core'
import { Label, YStack } from 'tamagui'

const MyGroupRenderer = (props) => {
  const { uischema, schema, path, visible, renderers, enabled, cells } = props
  console.log(props)
  const layoutProps = {
    elements: uischema.elements,
    schema: schema,
    path: path,
    direction: 'column' as any,
    visible: visible,
    uischema: uischema,
    renderers: renderers,
    cells
  }

  return (
    <YStack>
      <Label>{uischema.label}</Label>
      <TamaguiLayoutRenderer {...layoutProps} />
    </YStack>
  )
}

export default withJsonFormsLayoutProps(MyGroupRenderer)
export const myGroupTester = rankWith(1000, uiTypeIs('Group'))
