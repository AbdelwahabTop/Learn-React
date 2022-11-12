import { useState } from "react";

import { creatAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handelSubmit = () => {}
  
  const handelChange = (event) => {
    const { name, value } = event.target

    setFormFields({...formFields, [name]: value})
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={() => {}}>
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