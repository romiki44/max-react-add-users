import { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModale from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age.',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid input',
        message: 'Age must be greater than zero.',
      });
      return;
    }
    //console.log(enteredUsername, enteredAge);
    const user = {
      id: Math.random().toString().substring(2),
      name: enteredUsername,
      age: enteredAge,
    };
    props.onAddUser(user);
    setEnteredUsername('');
    setEnteredAge('');
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError();
  };

  return (
    //Card je custom component a nepozna className....treba osetrit preto cez props v samotnom componente
    //samozrejme nemusi sa volat className, moze sa volat napr. cssClass a pod...
    <div>
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
            value={enteredUsername}
            onChange={usernameChangeHandler}
          ></input>
          <label htmlFor='age'>Age (Years)</label>
          <input
            id='age'
            type='number'
            value={enteredAge}
            onChange={ageChangeHandler}
          ></input>
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
