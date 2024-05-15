import React from 'react';
import { Box, Button, Container, Input, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

interface SigninFormInput {
	email: string;
	password: string;
}

const SigninPage: React.FC<SigninFormInput> = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SigninFormInput>();
	const onSubmit: SubmitHandler<SigninFormInput> = (data) => console.log(data);
	console.log(watch('email'));

	return (
		<Container>
			<Box
				sx={{
					marginTop: '5rem',
				}}
			>
				<img src="/brand.png" alt="logo" />
			</Box>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack
					spacing={4}
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '5rem',
					}}
				>
					<Stack
						sx={{
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: '3rem',
						}}
					>
						<h1>Welcome to Iasana</h1>
						<h2>To get start, please log in</h2>
					</Stack>
					<Stack>
						<Input type="email" {...register('email', { required: true })} />
						{errors.email && <span>Please enter email</span>}
					</Stack>
					<Stack>
						<Input type="password" {...register('password', { required: true })} />
						{errors.password && <span>Please enter password</span>}
					</Stack>
					<Stack>
						<Button type="submit">
							<h5>Log in</h5>
						</Button>
						<h6>
							Don&apos;t have an account? <Link to="/signup">Sign up</Link>
						</h6>
					</Stack>
				</Stack>
			</form>
		</Container>
	);
};

export default SigninPage;
