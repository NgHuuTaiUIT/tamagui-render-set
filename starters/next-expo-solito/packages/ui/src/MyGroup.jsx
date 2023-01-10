// import { TamaguiLayoutRenderer } from './tamagui-render/util';
// // import {
// //   Accordion,
// //   AccordionDetails,
// //   AccordionSummary,
// //   Hidden,
// //   Typography
// // } from '@mui/material';
// // import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import React from 'react';
// import { withJsonFormsLayoutProps } from '@jsonforms/react';
// import { rankWith, uiTypeIs } from '@jsonforms/core';
// import { Label } from 'tamagui';

// const MyGroupRenderer = props => {
//   const { uischema, schema, path, visible, renderers } = props;
//   console.log(props);
//   const layoutProps = {
//     elements: uischema.elements,
//     schema: schema,
//     path: path,
//     direction: 'column',
//     visible: visible,
//     uischema: uischema,
//     renderers: renderers
//   };
//   console.log(props);

//   return (
//     <Hidden xsUp={!visible}>
//       {/* <Accordion> */}
//       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//         <Label>{uischema.label}</Label>
//       </AccordionSummary>
//       <AccordionDetails>
//         <TamaguiLayoutRenderer {...layoutProps} />
//       </AccordionDetails>
//       {/* </Accordion> */}
//     </Hidden>
//   );
// };

// export default withJsonFormsLayoutProps(MyGroupRenderer);
// export const myGroupTester = rankWith(1000, uiTypeIs('Group'));
