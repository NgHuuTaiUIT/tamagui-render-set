import { Fragment, useState, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import { H1, Heading, Label, Stack, YStack, Button, styled, Paragraph } from 'tamagui';
// import schema from './schema.json';
// import uischema from './uischema.json';
import {
  tamaguiCells,
  tamaguiRenderers
} from './tamagui-render';

import MyGroupRenderer, { myGroupTester } from './MyGroup';

const schema = {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 1
      },
      "include_gift": {
        "type": "boolean",
      },
      "rating": {
        "type": "number",
      },
      "recurrence_interval": {
        "type": "integer"
      },
    }
}

const uischema = {
    "label": "My Group!",
    "type": "Group",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/name"
      },
      {
        "type": "Control",
        "scope": "#/properties/include_gift",
        "options": {
          "toggle": true
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/rating"
      },
      {
        "type": "Control",
        "scope": "#/properties/recurrence"
      },
    ],
  }
  

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

const initialData = {
  name: 'Send email to Adrian',
//   description: 'Confirm if you have passed the subject\nHereby ...',
//   done: true,
//   recurrence: 'Daily',
  rating: 3
};

const renderers = [
  ...tamaguiRenderers,
  //register custom renderers
//   { tester: ratingControlTester, renderer: RatingControl },
  { tester: myGroupTester, renderer: MyGroupRenderer }
];

const Test = () => {
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
