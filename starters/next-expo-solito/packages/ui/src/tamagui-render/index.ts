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
import {
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry
} from '@jsonforms/core';
// import {
//   tamaguiAllOfControlTester,
//   TamaguiAllOfRenderer,
//   tamaguiAnyOfControlTester,
//   TamaguiAnyOfRenderer,
//   TamaguiArrayControlRenderer,
//   tamaguiArrayControlTester,
//   tamaguiObjectControlTester,
//   TamaguiObjectRenderer,
//   tamaguiOneOfControlTester,
//   TamaguiOneOfRenderer,
//   TamaguiEnumArrayRenderer,
//   tamaguiEnumArrayRendererTester
// } from './complex';
// import {
//   TamaguiLabelRenderer,
//   tamaguiLabelRendererTester,
//   TamaguiListWithDetailRenderer,
//   tamaguiListWithDetailTester
// } from './additional';
import {
  InputText
} from './tamagui-controls';
import { TamaguiTextControl, tamaguiTextControlTester } from './controls';
import { TamaguiTextCell, tamaguiTextCellTester } from './cells';
// import {
//   TamaguiArrayLayout,
//   tamaguiArrayLayoutTester,
//   TamaguiCategorizationLayout,
//   tamaguiCategorizationTester,
//   TamaguiGroupLayout,
//   tamaguiGroupTester,
//   TamaguiHorizontalLayout,
//   tamaguiHorizontalLayoutTester,
//   TamaguiVerticalLayout,
//   tamaguiVerticalLayoutTester
// } from './layouts';
// import {
//   TamaguiBooleanCell,
//   tamaguiBooleanCellTester,
//   TamaguiBooleanToggleCell,
//   tamaguiBooleanToggleCellTester,
//   TamaguiDateCell,
//   tamaguiDateCellTester,
//   TamaguiEnumCell,
//   tamaguiEnumCellTester,
//   TamaguiIntegerCell,
//   tamaguiIntegerCellTester,
//   TamaguiNumberCell,
//   tamaguiNumberCellTester,
//   TamaguiNumberFormatCell,
//   tamaguiNumberFormatCellTester,
//   TamaguiOneOfEnumCell,
//   tamaguiOneOfEnumCellTester,
//   TamaguiTextCell,
//   tamaguiTextCellTester,
//   TamaguiTimeCell,
//   tamaguiTimeCellTester
// } from './cells';
// import TamaguiCategorizationStepperLayout, {
//   tamaguiCategorizationStepperTester
// } from './layouts/TamaguiCategorizationStepperLayout';

// export * from './complex';
// export * from './controls';
// export * from './layouts';
// export * from './cells';
export * from './tamagui-controls';
export * from './util';

export const tamaguiRenderers: JsonFormsRendererRegistryEntry[] = [
  { tester: tamaguiTextControlTester, renderer: TamaguiTextControl },

];

export const tamaguiCells: JsonFormsCellRendererRegistryEntry[] = [
  { tester: tamaguiTextCellTester, cell: TamaguiTextCell },
];
