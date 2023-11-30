import { useState, useEffect } from 'react';

export default function ConstructionBeta() {
	const [statusMessage, setStatusMessage] = useState(null);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await fetch('http://localhost:9999/api/messages');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setStatusMessage(data.Messages);
				console.log(data.Messages);
			} catch (error) {
				console.error('Failed to fetch messages:', error);
			}
		};

		fetchMessages();
	}, []);

	return (
		<section className="min-h-screen bg-primary flex flex-col items-center justify-center">
			{statusMessage && (
				<div className="w-full fixed top-0 z-50">
					{Object.entries(statusMessage).map(([key, message]) => (
						<div
							key={key}
							style={{ backgroundColor: message.color }}
							className="p-2 text-black rounded-t mb-4 text-center">
							<p>{message.text}</p>
							<p className="text-gray-400 text-bold">
								Last updated: {new Date(message.timestamp).toLocaleString()}
							</p>
						</div>
					))}
				</div>
			)}
			<h1 className="text-6xl font-bold text-gray-400 mb-6">archways404.dev</h1>
			<h1 className="text-4xl font-bold text-yellow-300 mb-12">
				is currently under construction
			</h1>

			<div className="animate-bounce text-3xl mb-8">
				<IconConstruction className="h-12 w-12 text-yellow-500" />
			</div>
			<button
				onClick={() =>
					(window.location = 'https://modernprimula.hashnode.dev/')
				}
				className="bg-primary border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black font-bold py-2 px-3 rounded-full">
				Read more
			</button>
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
