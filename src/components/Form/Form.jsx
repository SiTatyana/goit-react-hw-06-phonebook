import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import {PhonebookForm, PhonebookHeader, PhonebookLabel, PhonebookInput, PhonebookButton}from './Form.styled'


const nameInputId = nanoid();
const numberInputId = nanoid() 


const Form = () => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const {name, value} = e.currentTarget;  
    
    switch(name) {
      case "number":
        return setNumber(value); 
      case "name":
        return setName(value); 
      default:
      return;
    }
  };

  
  const chekingContacts = () => {
    const findContact = contacts.find((contact) => contact.name === name);
    const findNumber = contacts.find((contact) => contact.number === number);

    if (findContact) { 
      alert(`${name} is already in contacts`);      
    } 
      else if (findNumber) { 
      alert(`${number} is already in contacts`);      
    }             
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    chekingContacts()
    dispatch(addContact(name, number));
    setName('');
    setNumber('');
      };


  return(
      <PhonebookForm onSubmit={handleSubmit}>
      <PhonebookHeader>Phonebook</PhonebookHeader>
        <PhonebookLabel>Name
          <PhonebookInput
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleInputChange}
            value={name}    
            id={nameInputId}          
          /> 
        </PhonebookLabel>
          
        <PhonebookLabel>Number
          <PhonebookInput
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleInputChange}
            value={number}  
            id={numberInputId}            
          />  
        </PhonebookLabel>
      
        <PhonebookButton type="submit">Add number</PhonebookButton>
      </PhonebookForm >
    
  )
}

export default Form;