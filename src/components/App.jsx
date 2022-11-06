import React from "react";
import Form from "./Form/Form";
import Contacts from "./Contacts/Contacts";
import Filter from "./Filter/Filter";


export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 23,
        color: '#010101'
      }}
    >
      <Form/>
      <Filter/>
      <Contacts />
      
    </div>
  );
};
