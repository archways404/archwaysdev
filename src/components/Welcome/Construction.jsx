/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7VK5Zo2je1k
 */
//import { Button } from '@/components/ui/button';

export default function Construction() {
	return (
		<section
			key="1"
			className="flex flex-col items-center justify-center min-h-screen py-2 bg-bp">
			<div className="flex flex-col items-center justify-center space-y-8">
				<h1 className="text-6xl font-bold text-p text-left">
					Welcome to
					<br />
					<span className="mt-2 text-8xl text-s block">archways404.dev</span>
				</h1>
				<h2 className="text-2xl font-medium text-light">
					The site is currently under construction.
				</h2>
				<button
					onClick={() =>
						(window.location = 'https://modernprimula.hashnode.dev/')
					}
					className="bg-s hover:bg-p text-light py-3 px-3 rounded ">
					Stay Updated
				</button>
			</div>
		</section>
	);
}
