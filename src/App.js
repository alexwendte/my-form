import React from 'react';
import './App.css';
import Form from './components/form/Form';
import Input from './components/form/Input';

const App = () => (
  <div className="App">
    <Form onSubmit={() => {}}>
      <Input type="text" allName="yes" id="no" isRequired requiredMessage="This is important!" />
      <Input type="text" allName="yes" id="WhyNot" isRequired requiredMessage="Yo yow!!" />
    </Form>
  </div>
);

export default App;
