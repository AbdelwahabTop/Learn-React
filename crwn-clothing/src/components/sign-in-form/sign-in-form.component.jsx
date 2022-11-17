import { useState } from "react";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { creatAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

import './sign-in-form.style.scss';


const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user);
  }

  const handelSubmit = async (event) => {
    event.preventDefault();

    try {

      resetFormFields();
    } catch (error) {}
  }
  
  const handelChange = (event) => {
    const { name, value } = event.target

    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handelSubmit}>
        <FormInput label='Email' type="email" required onChange={handelChange} name='email' value={email} />

        <FormInput label='Password' type="password" required onChange={handelChange} name='password' value={password} />

        <Button type="submit">Sign In</Button>
        <Button onClick={signInWithGoogle}>Google Sign In</Button>
      </form>
    </div>
  )
}

export default SignInForm;