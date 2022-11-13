import { useState } from "react";

import { creatAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

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
        console.error('user creation encounter an error', error);
      }
    }
  }
  
  const handelChange = (event) => {
    const { name, value } = event.target

    setFormFields({...formFields, [name]: value})
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handelSubmit}>
        <label htmlFor="">Display Name</label>
        <input type="text" required onChange={handelChange} name='displayName' value={displayName} />

        <label htmlFor="">Email</label>
        <input type="email" required onChange={handelChange} name='email' value={email} />

        <label htmlFor="">Password</label>
        <input type="password" required onChange={handelChange} name='password' value={password} />

        <label htmlFor="">Confirm Password</label>
        <input type="password" required onChange={handelChange} name='confirmPassword' value={confirmPassword} />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm;