import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import Overview from './pages/Overview';
import WorkOrders from './pages/WorkOrders';
import Dispatch from './pages/Dispatch';
import Customers from './pages/Customers';
import Team from './pages/Team';
import Reports from './pages/Reports';
import AppLayout from './ui/AppLayout';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route element={<AppLayout />}>
					<Route index element={<Navigate replace to='overview' />} />
					<Route path='app/:orgId/overview' element={<Overview />} />
					<Route path='app/:orgId/work-orders' element={<WorkOrders />} />
					<Route path='app/:orgId/dispatch' element={<Dispatch />} />
					<Route path='app/:orgId/customers' element={<Customers />} />
					<Route path='app/:orgId/team' element={<Team />} />
					<Route path='app/:orgId/reports' element={<Reports />} />
					<Route path='app/:orgId/settings' element={<Settings />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
