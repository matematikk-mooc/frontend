<template>
	<div>
		<a class="externalButton" href="https://www.udir.no" target="_blank" rel="noreferrer">
			<p class="udirno">udir.no</p>
			<svg-icon type="mdi" :path="mdiOpenInNew"></svg-icon>
		</a>
	</div>
</template>

<script>
export default {
	name: 'ExternalButton',
}
</script>


<script setup>
import SvgIcon from 'vue3-icon';
import { mdiOpenInNew } from '@mdi/js/mdi.js';
</script>

<style>
.externalButton {
	background-color: #7dbf9d;
	color: black;
	display: flex;
	width: fit-content;
	height: 2.5rem;
	gap: 8px;
	border: none;
	justify-content: center;
	align-items: center;
	padding: 0 1rem 0 1rem;
	text-decoration: none  !important;
}

.udirno {
	width: 4.125rem;
	height: 1.375rem;
	flex-grow: 0;
	font-family: Montserrat;
	font-size: 1.125rem;
	font-weight: 600;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: normal;
	text-align: center;
}
</style>
