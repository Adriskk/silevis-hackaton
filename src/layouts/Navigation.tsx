import React, { FC } from 'react';

import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';

const Navigation: FC = () => {
	const items = [
		{ label: 'Players', icon: 'pi pi-fw pi-users' },
		{ label: 'Profile', icon: 'pi pi-fw pi-user-edit' },
		{ label: 'Settings', icon: 'pi pi-fw pi-cog' },
	];

	return (
		<nav className='flex justify-content-center gap-6 p-5'>
			<span className='flex align-items-center text-xl'>PlayersMarket</span>
			<TabMenu model={items} />
			<Button label='Register' icon='pi pi-arrow-right' iconPos='right' />
		</nav>
	);
};

export default Navigation;
