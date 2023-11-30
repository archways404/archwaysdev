import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import LoginScreen from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Welcome />}
				/>
				<Route
					path="/admin"
					element={<LoginScreen />}
				/>
				<Route
					path="/admin/dashboard"
					element={<AdminDashboard />}
				/>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
