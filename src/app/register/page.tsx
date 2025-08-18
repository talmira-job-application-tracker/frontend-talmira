// "use client";

// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import axios from 'axios';

// export const schema = yup.object({
//   name: yup.string().required('Name is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   image: yup
//     .mixed()
//     .test('required', 'Image is required', value => value && value.length > 0)
//     .test('fileType', 'Only jpg, jpeg, or png files are allowed', (value) => {
//       if (!value || value.length === 0) return false;
//       return ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0]?.type);
//     }),
//   password: yup
//     .string()
//     .required('Password is required')
//     .min(6, 'Password must be at least 6 characters long'),
//   phone: yup
//     .string()
//     .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
//     .required('Number is required'),
//   skills: yup.string(),
//   interests: yup.string()
// });

// export default function Register() {
//   const router = useRouter();

//   const { register, handleSubmit, reset, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const handleRegisterButton = async (formValues) => {
//     const formData = new FormData();
//     formData.append('name', formValues.name);
//     formData.append('email', formValues.email);
//     formData.append('image', formValues.image[0]);
//     formData.append('password', formValues.password);
//     formData.append('phone', formValues.phone);
//     formData.append('skills', formValues.skills || '');
//     formData.append('interests', formValues.interests || '');

//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
//         formData
//       );

//       alert('Registration successful');
//       const { token, data: userData } = res.data;

//       if (token) {
//         localStorage.setItem('token', token);
//         if (userData) {
//           localStorage.setItem('user', JSON.stringify(userData));
//         }
//         reset();
//         router.push('/list');
//       }
//     } catch (err) {
//       console.error('Error registering user:', err);
//       alert('Registration failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(handleRegisterButton)}>
//       <input type="text" placeholder="Name" {...register('name')} />
//       <p>{errors.name?.message}</p>

//       <input type="email" placeholder="Email" {...register('email')} />
//       <p>{errors.email?.message}</p>

//       <input type="file" {...register('image')} />
//       <p>{errors.image?.message}</p>

//       <input type="password" placeholder="Password" {...register('password')} />
//       <p>{errors.password?.message}</p>

//       <input type="text" placeholder="Phone" {...register('phone')} />
//       <p>{errors.phone?.message}</p>

//       <input type="text" placeholder="Skills" {...register('skills')} />
//       <p>{errors.skills?.message}</p>

//       <input type="text" placeholder="Interests" {...register('interests')} />
//       <p>{errors.interests?.message}</p>

//       <button type="submit">Register</button>
//     </form>
//   );
// }
"use client"
