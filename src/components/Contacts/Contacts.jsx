
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from 'redux/contactsSlice';
import { getContacts,getFilter  } from 'redux/selectors';
import {ContactsItem, ContactsList, ContactsDiv,ContactsSpan} from './Contacts.styled';


const Contacts = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const contactFiltering = () => { 
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter))
  };

  const filteredContacts = contactFiltering();


  return (
    <ContactsDiv>
      <ContactsList>
      {filteredContacts.map(({ id, name, number }) => 
        <ContactsItem key={id}>
          {name}: {number}
          <ContactsSpan type='button' onClick={() => {
                dispatch(removeContact(id));
              }}>❌</ContactsSpan> 
        </ContactsItem>)
      }   
     </ContactsList>
    </ContactsDiv> 
  ) 
}


export default Contacts;
