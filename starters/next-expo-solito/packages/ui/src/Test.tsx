import { Fragment, useState, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import { H1, Heading, Label, Stack, YStack, Button, styled, Paragraph } from 'tamagui';
// import schema from './json-forms/schema';
// import uischema from './json-forms/uischema';
import {
  tamaguiCells,
  tamaguiRenderers
} from './tamagui-render';

import MyGroupRenderer, { myGroupTester } from './MyGroup';


const Container = styled(YStack, {
    padding: '1em',
    width: '100%'
})

const Title = styled(H1, {
    textAlign: 'center',
    padding: '0.25em'
})

const  Content = styled(Paragraph, {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem'
})

const ResetButton = styled(Button,{
    margin: 'auto',
    display: 'block'
});

const Demoform = styled(YStack ,{
        margin: 'auto',
        padding: '1rem'
})


const renderers = [
  ...tamaguiRenderers,
  //register custom renderers
//   { tester: ratingControlTester, renderer: RatingControl },
  { tester: myGroupTester, renderer: MyGroupRenderer }
];

const Test = ({schema, uischema, initialData}) => {
//   const classes = useStyles();
  const [data, setData] = useState<any>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };
  console.log(tamaguiRenderers);

  return (
    <Fragment>
      <div className='App'>
        <header className='App-header'>
          {/* <img src={logo} className='App-logo' alt='logo' /> */}
          <h1 className='App-title'>Welcome to JSON Forms with React</h1>
          <p className='App-intro'>More Forms. Less Code.</p>
        </header>
      </div>

      <Container
        justifyContent={'center'}
        space={1}
        >
        <YStack>
          <Title>
            Bound data
          </Title>
          <Content>
            {stringifiedData}
          </Content>
          <Button
            onPress={clearData}
            color='primary'
            >
            Clear data
          </Button>
        </YStack>
        <YStack>
          <Title>
            Rendered form
          </Title>
          <Demoform>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={renderers}
              cells={tamaguiCells}
              onChange={({ errors, data }) => setData(data)}
            />
          </Demoform>
        </YStack>
      </Container>
    </Fragment>
  );
};

export default Test;
