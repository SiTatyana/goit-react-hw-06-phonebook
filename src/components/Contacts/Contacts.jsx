import { useState, useEffect } from 'react';
import Form from '../Form/Form';
import ContactList from '../ContactList/ContactList';
import { nanoid } from 'nanoid';
import {SearchContact, SearchHeader, SearchInput} from './Contacts.styled'


export default function Contacts() {
const [contacts, setContacts] = useState(() => {
    const value = JSON.parse(localStorage.getItem("contacts"));
    return value ?? [];
});
    const [filter, setFilter] = useState("");

    useEffect (() => {
        localStorage.setItem("contacts", JSON.stringify(contacts))
    }, [contacts] )
    
      const handleChange = (e) => {
        const {value} = e.target;
        setFilter(value);
       }
    
       const addContact = (data) => {
        if (isDuplacate(data)){
            return alert(`This ${data.name} - ${data.number} is already in this phonebook`);
        }
        setContacts((prev) => {
            const newContact = {
                id: nanoid(),
                ...data
            }
            return [...prev, newContact]
            
        })
       }
    
       const removeContact = (id) => {
        setContacts ((prev) => {
            const newContacts = prev.filter((item) => item.id !== id);
            return newContacts;
            })
       }
    
       const isDuplacate = ({name, number}) => {
        const result = contacts.find((item) => item.name === name || item.number === number);
        return result;
       }
    
       const getFilteredContacts = () => {
        if(!filter){
            return contacts;
        } 

    
        const normalizedFilter = filter.toLocaleLowerCase();
        const filteredContacts = contacts.filter (({name}) =>{
        const normalizedName = name.toLocaleLowerCase();
        const result = normalizedName.includes(normalizedFilter);
            return result;
        })
        return filteredContacts;
       }
       const filteredContacts = getFilteredContacts();


    return (
        <div>
          <Form onSubmit={addContact} />
          <SearchContact> 
          <SearchHeader>Phonebook Navigation</SearchHeader>
          <SearchInput type="text" name="filter" value={filter} onChange={handleChange}></SearchInput>
          </SearchContact>
          <ContactList items ={filteredContacts} removeContact={removeContact} />
          
        </div>
      )
}


// export default class Contacts extends Component {
//    state = {
//     contacts: [ 
//     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//     {id: 'id-4', name: 'Annie Copeland', number:'227-91-26'},],
//     filter:'',
//    }

//    componentDidMount(){
//     const contacts = JSON.parse(localStorage.getItem("contacts"));
//     if(contacts?.length){
//     this.setState({
//         contacts,
//     })
//     }
//    }

//    componentDidUpdate(prevProps, prevState){
//     console.log('componentDidUpdate', prevProps, prevState);
//     const {contacts} = this.state;
//     if(prevState.contacts !== contacts){
//         localStorage.setItem("contacts", JSON.stringify(contacts));
//     }
     
//    }

//    handleChange = (e) => {
//     const {name,value} = e.target;
//     this.setState({
//         [name]:value,
//     })
//    }

//    addContact = (data) => {
//     if (this.isDuplacate(data)){
//         return alert(`This ${data.name} - ${data.number} is already in this phonebook`);
//     }
//     this.setState ((prev) => {
//         const newContact = {
//             id: nanoid(),
//             ...data
//         }
//         return {
//             contacts: [...prev.contacts, newContact]
//         }
//     })
//    }

//    removeContact = (id) => {
//     this.setState ((prev) => {
//         const newContacts = prev.contacts.filter((item) => item.id !== id);
//         return {
//             contacts: newContacts,
//         }
//     })
//    }

//    isDuplacate({name, number}) {
//     const {contacts} = this.state;
//     const result = contacts.find((item) => item.name === name || item.number === number);
//     return result;
//    }

//    getFilteredContacts(){
//     const {contacts, filter} = this.state;
//     if(!filter){
//         return contacts;
//     } 

//     const normalizedFilter = filter.toLocaleLowerCase();
//     const filteredContacts = contacts.filter (({name}) =>{
//         const normalizedName = name.toLocaleLowerCase();
//         const result = normalizedName.includes(normalizedFilter);
//         return result;
//     })
//     return filteredContacts;
//    }

//   render() {
//     const {addContact,removeContact, handleChange} = this;
//     const {filter} = this.state;
//     const contacts = this.getFilteredContacts();
//     return (
//       <div>
//         <Form onSubmit={addContact} />
//         <SearchContact> 
//         <SearchHeader>Phonebook Navigation</SearchHeader>
//         <SearchInput type="text" name="filter" value={filter} onChange={handleChange}></SearchInput>
//         </SearchContact>
//         <ContactList items ={contacts} removeContact={removeContact} />
        
//       </div>
//     )
//   }
// }
