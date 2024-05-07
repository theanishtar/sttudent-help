// Status just append 4 types: 'success' | 'info' | 'warning' | 'error'

import {notification} from 'antd';

export const showNotiMessage = (status, message) => {
	notification[status]({
		message,
	});
};
