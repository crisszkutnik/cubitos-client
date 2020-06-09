import React, {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import {useHistory} from 'react-router-dom'
import '../css/register.css'
import '../css/logReg.css'

const validate = values => {
	 const errors = {};
	 
   if(!values.username) {
      errors.username = 'Required';
   } else if (values.username.length < 3 || values.username.length > 30) {
      errors.username = 'Must be between 3 and 30 characters';
   }
  
   if(!values.password) {
      errors.password = 'Required';
   } else if (values.password.length < 3 || values.password.length > 50) {
      errors.password = 'Password must have at least 3 characters';
	}

	if(!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	
	if(!values.name) errors.name = 'Required';

	if(!values.surname) errors.surname = 'Required';
  
   return errors;
};

const RegisterForm = () => {
	const history = useHistory();

	const [resStatus, setStatus] = useState(0);

	useEffect(() => {
		fetch('/user/isLogged', {
            method: 'POST',
            headers: {
            	'Accept': 'application/json',
            	'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: ''
		})
		.then(res => {
			if(res.status === 200)
				history.push('/dashboard/actual');
		})
	}, []);

    const formik = useFormik({
        initialValues: {
            username: '',
				password: '',
				email: '',
            name: '',
            surname: ''
        },
        validate,
        onSubmit: values => {
			fetch('/user/register', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			})
			.then(res => {
				if(res.status === 201) {
					setStatus(res.status);
					setTimeout(() => history.push('/login'), 4000);
				} else if(res.status === 500 || res.status === 401)
					setStatus(res.status);
			})
			.catch(e => setStatus(500));
        },
    });
    
    return (
      <div id='register-form'>
		{resStatus === 201 &&
			<div className='ok-response'>Account created correctly. Redirecting.</div>
		}
		{resStatus === 500 &&
			<div className='bad-response'>Error occurred. If it persists contanct webpage administrator.</div>
		}
		{resStatus === 401 &&
			<div className='bad-response'>Username already taken or you have already created an account.</div>
		}
        <form onSubmit={formik.handleSubmit}>
			<div className='input-field'>
				<label htmlFor='username'>Username</label>
				<input
					id='username'
					name='username'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.username}
				/>

				{formik.touched.username && formik.errors.username ? (
				<div className='form-error'>{formik.errors.username}</div>
				) : null}
			</div>

        	<div className='input-field'>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					name='password'
					type='password'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
				/>

				{formik.touched.password && formik.errors.password ? (
				<div className='form-error'>{formik.errors.password}</div>
				) : null}
			</div>

			<div className='input-field'>
				<label htmlFor='name'>Name</label>
				<input
					id='name'
					name='name'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
				/>
				{formik.touched.name && formik.errors.name ? (
				<div className='form-error'>{formik.errors.name}</div>
				) : null}
			</div>

			<div className='input-field'>
				<label htmlFor='surname'>Surname</label>
				<input
					id='surname'
					name='surname'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.surname}
				/>
				{formik.touched.surname && formik.errors.surname ? (
				<div className='form-error'>{formik.errors.surname}</div>
				) : null}
			</div>

			<div className='input-field'>
				<label htmlFor='email'>Email</label>
				<input
					id='email'
					name='email'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
				/>
				{formik.touched.email && formik.errors.surname ? (
				<div className='form-error'>{formik.errors.email}</div>
				) : null}
			</div>

            <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default RegisterForm;