import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import Logo from 'components/common/Logo';
import Section from 'components/common/Section';
import {Outlet} from 'react-router-dom';

const AuthSimpleLayout = () => (
	<Section className='py-0'>
		<Outlet />
	</Section>
);

export default AuthSimpleLayout;
