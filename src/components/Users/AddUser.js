import { useRef, useState } from 'react';
import Wrapper from '../Helpers/Wrapper';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModale from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  //spojenie js premmnej a html-elementu
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    //object s property current: {}...real DOM-node!
    //v podstate potom nepotrebujeme useState(), pretoze sme conectnuti priamo na html-element
    //len zmenime povodny enteredUsername->name a enteredAge->age
    //ono je to aj logicke, lebo html-element ma akoby svoj vlastny useState() a my teda nepotrebujeme
    //vytvarat novy useState() v apke, staci ked vyuzijeme ten v html-elemente
    const name = nameInputRef.current.value;
    const age = ageInputRef.current.value;
    if (name.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age.',
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: 'Invalid input',
        message: 'Age must be greater than zero.',
      });
      return;
    }
    //console.log(enteredUsername, enteredAge);
    const user = {
      id: Math.random().toString().substring(2),
      name: name,
      age: age,
    };
    props.onAddUser(user);
    //tym ze sme vyhodili state, sme stratili logiku na vynulovanie stavu
    //da sa pouzit takto priamo cez DOM....nie je to optimalne, ale toto je jednoduche a nerobi problem
    //takze vcileky neviem, ci je lepsi useState() alebo useRef()...:)
    //mozno ked iba potrebujeme citat hodnoty a nie ich menit, vtedy je asi dobre pouzit useRef()
    //useRef..uncontrolled elements (by react), useState...controlled elements (by react)
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
    // setEnteredUsername('');
    // setEnteredAge('');
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError();
  };

  return (
    //Card je custom component a nepozna className....treba osetrit preto cez props v samotnom componente
    //samozrejme nemusi sa volat className, moze sa volat napr. cssClass a pod...
    <Wrapper>
      {error && (
        <ErrorModale
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          ></input>
          <label htmlFor='age'>Age (Years)</label>
          <input
            id='age'
            type='number'
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          ></input>
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
