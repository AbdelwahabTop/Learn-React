import { useState } from "react";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { creatAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-form.style.scss';


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handelSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert('password do not match');
      return;
    }

    try {
      const { user } = await creatAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, {displayName})
      resetFormFields();
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('cannot creat user, email already in use');
      } else {
        console.error('user creation encounter an errroor', error);
      }
    }
  }
  
  const handelChange = (event) => {
    const { name, value } = event.target

    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handelSubmit}>
        <FormInput 
          label='Display Name' 
          type="text" 
          required 
          onChange={handelChange} 
          name='displayName' 
          value={displayName} 
        />

        <FormInput label='Email' type="email" required onChange={handelChange} name='email' value={email} />

        <FormInput label='Password' type="password" required onChange={handelChange} name='password' value={password} />

        <FormInput label='Confirm Password' type="password" required onChange={handelChange} name='confirmPassword' value={confirmPassword} />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}
export default SignUpForm;