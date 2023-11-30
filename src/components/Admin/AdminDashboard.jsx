/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [newName, setNewName] = useState('');
	const [color, setColor] = useState('');

	const contextClass = {
		success: 'bg-green-700',
		error: 'bg-red-700',
		info: 'bg-gray-700',
		warning: 'bg-orange-500',
		default: 'bg-indigo-700',
		dark: 'bg-white-600 font-gray-300',
	};

	useEffect(() => {
		const authStatus = localStorage.getItem('loginstatus');
		if (authStatus === '404') {
			console.log('authStatus is success!');
		}
		if (authStatus != '404') {
			localStorage.setItem('loginstatus', false);
			console.log('authStatus is false!');
			window.location.href = '/admin';
		}
	}, []);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await fetch('http://localhost:9999/api/messages');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setMessages(data.Messages);
			} catch (error) {
				console.error('Failed to fetch messages:', error);
			}
		};

		fetchMessages();
	}, []);

	const refetchMessages = async () => {
		try {
			const response = await fetch('http://localhost:9999/api/messages');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setMessages(data.Messages);
		} catch (error) {
			console.error('Failed to fetch messages:', error);
		}
	};

	const deleteMessageByTimestamp = async (timestamp) => {
		try {
			console.log('timestamp: ', timestamp);
			const response = await fetch('http://localhost:9999/api/messages', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ timestamp }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			console.log('Message deleted successfully');
			toast.success('Delete successful!', {
				position: toast.POSITION.TOP_CENTER,
			});
			// Update the messages state to filter out the deleted message
			setMessages((prevMessages) =>
				Object.entries(prevMessages)
					.filter(([key, message]) => message.timestamp !== timestamp)
					.reduce((acc, [key, message]) => ({ ...acc, [key]: message }), {})
			);
			// Update the UI accordingly
		} catch (error) {
			toast.fail('Delete failed!', {
				position: toast.POSITION.TOP_CENTER,
			});
			console.error('Failed to delete message:', error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:9999/api/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: newName,
					text: newMessage,
					color: color,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			refetchMessages();
			setNewMessage('');
			setColor('');
			setNewName('');
			toast.success('Entry added!', {
				position: toast.POSITION.TOP_CENTER,
			});
		} catch (error) {
			console.error('Failed to create message:', error);
			toast.error('ERROR!', {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	return (
		<section className="min-h-screen bg-primary flex flex-col items-center justify-center">
			<h1 className="text-6xl font-bold text-yellow-500 mb-6">404</h1>
			<ToastContainer
				toastClassName={({ type }) =>
					contextClass[type || 'dark'] +
					' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
				}
				bodyClassName={() => 'text-sm font-white font-med block p-3'}
				position="bottom-left"
				autoClose={3000}
			/>
			<div>
				{Object.entries(messages).map(([key, message]) => (
					<div
						key={key}
						className="bg-white shadow-md rounded p-4 mb-4">
						<div className="mb-2">
							<label
								htmlFor={`name-${key}`}
								className="font-bold mr-2">
								Name:
							</label>
							<input
								type="text"
								id={`name-${key}`}
								className="bg-gray-100 p-2 rounded border border-gray-300"
								value={key}
								disabled
							/>
						</div>

						<div className="mb-2">
							<label
								htmlFor={`message-${key}`}
								className="font-bold mr-2">
								Message:
							</label>
							<input
								type="text"
								id={`message-${key}`}
								className="bg-gray-100 p-2 rounded border border-gray-300"
								value={message.text}
								disabled
							/>
						</div>

						<div className="mb-2">
							<label
								htmlFor={`color-${key}`}
								className="font-bold mr-2">
								Color:
							</label>
							<input
								type="text"
								id={`color-${key}`}
								className="bg-gray-100 p-2 rounded border border-gray-300"
								value={message.color}
								disabled
							/>
						</div>

						<div>
							<label
								htmlFor={`timestamp-${key}`}
								className="font-bold mr-2">
								Timestamp:
							</label>
							<input
								type="text"
								id={`timestamp-${key}`}
								className="bg-gray-100 p-2 rounded border border-gray-300"
								value={new Date(message.timestamp).toLocaleString()}
								disabled
							/>
							<br></br>
							<button
								onClick={() => deleteMessageByTimestamp(message.timestamp)}
								className="bg-red-500 text-white p-2 rounded mt-2 hover:bg-red-600">
								DELETE
							</button>
						</div>
					</div>
				))}
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
						placeholder="Enter name"
					/>
					<br></br>
					<br></br>
					<textarea
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder="Enter message"
					/>
					<br></br>
					<br></br>
					<select
						value={color}
						onChange={(e) => setColor(e.target.value)}>
						<option value="">Select color</option>
						<option value="red">Red</option>
						<option value="blue">Blue</option>
						<option value="green">Green</option>
					</select>
					<br></br>
					<br></br>
					<button type="submit">Create Message</button>
				</form>
			</div>
		</section>
	);
}
