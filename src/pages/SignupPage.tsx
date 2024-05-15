import React from 'react';
import { Box, Button, Container, Input, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const SignupPage: React.FC = () => {
	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<Container>
			<Box
				sx={{
					marginTop: '5rem',
				}}
			>
				<img src="/brand.png" alt="logo" />
			</Box>

			<form onSubmit={submitHandler}>
				<Stack
					spacing={4}
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '4rem',
					}}
				>
					<Stack
						sx={{
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: '2rem',
						}}
					>
						<h1>Sign up</h1>
					</Stack>
					<Stack>
						<Input type="text" />
					</Stack>
					<Stack>
						<Input type="text" />
					</Stack>
					<Stack>
						<Input type="email" />
					</Stack>
					<Stack>
						<Input type="password" />
					</Stack>
					<Stack>
						<Button>
							<h5>Sign up</h5>
						</Button>
						<h6>
							Already have an account? <Link to="/login">Log in</Link>
						</h6>
					</Stack>
				</Stack>
			</form>
		</Container>
	);
};

export default SignupPage;
