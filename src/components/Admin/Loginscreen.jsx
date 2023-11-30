/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

export default function Loginscreen() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		const authStatus = localStorage.getItem('loginstatus');
		if (authStatus === '404') {
			window.location.href = '/admin/dashboard';
		}
		if (authStatus != '404') {
			localStorage.setItem('loginstatus', false);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch('http://82.183.49.2:9999/api/adminlogin/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username: username, password: password }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const server_response = await response.json();
			console.log(server_response);
			const loginstatus = server_response.loginstatus;
			const verification_status = server_response.verification;
			console.log(loginstatus);
			console.log(verification_status);
			if (verification_status === '404') {
				localStorage.setItem('loginstatus', verification_status);
				window.location.href = '/admin';
			} else {
				localStorage.setItem('loginstatus', false);
				window.location.href = '/';
			}
		} catch (error) {
			console.error('Failed to submit login:', error);
		}
	};

	return (
		<section className="min-h-screen bg-primary flex flex-col items-center justify-center">
			<h1 className="text-6xl font-bold text-yellow-500 mb-6">404</h1>
			<div className="animate-bounce text-3xl mb-8">
				<IconConstruction className="h-12 w-12 text-yellow-500" />
			</div>
			<form
				onSubmit={handleLogin}
				className="text-center">
				<input
					className="bg-primary border-2 border-yellow-300 text-yellow-300 font-bold mt-2 mb-2 py-2 px-3 rounded-full"
					type="text"
					placeholder="Username"
					aria-label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<br />
				<input
					className="bg-primary border-2 border-yellow-300 text-yellow-300 font-bold mt-2 mb-2 py-2 px-3 rounded-full"
					type="password"
					placeholder="Password"
					aria-label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<button
					type="submit"
					className="bg-primary border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black mt-2 mb-2 font-bold py-2 px-3 rounded-full">
					Login
				</button>
			</form>
		</section>
	);
}

function IconConstruction(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="yellow"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<rect
				x="2"
				y="6"
				width="20"
				height="8"
				rx="1"
			/>
			<path d="M17 14v7" />
			<path d="M7 14v7" />
			<path d="M17 3v3" />
			<path d="M7 3v3" />
			<path d="M10 14 2.3 6.3" />
			<path d="m14 6 7.7 7.7" />
			<path d="m8 6 8 8" />
		</svg>
	);
}
