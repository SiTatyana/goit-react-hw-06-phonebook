
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { filterContacts } from 'redux/filterSlice';
import {SearchContact, SearchHeader, SearchInput} from './Filter.styled'

const Filter = () => {

  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const serchingFilter = (e) => {
    const value = e.currentTarget.value;
    dispatch(filterContacts(value));
  };  
  

    return(
        <SearchContact>
          <SearchHeader>Phonebook Navigation</SearchHeader>
          <SearchInput
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          
          
           type="text"
           name="filter" 
           value={filter}
           onChange={serchingFilter} />
        </SearchContact>
    )
}

export default Filter;