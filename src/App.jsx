import { Outlet, redirect } from "react-router-dom";
import axios from "axios";
import logo from './assets/logo.svg'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import './index.css'

export default function Root() {
	return (
		<>
			<div className="h-full" id="main">
				<Outlet />
			</div>
		</>
	);
}