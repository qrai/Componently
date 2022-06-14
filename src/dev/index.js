import { Component } from '../framework/index'

Component('login-form', class {
	//get shadow() {
	//	return { mode: 'open' }
	//}

	render() {
		return /*html*/`
			<slot name="title"></slot>
			<input type="text" id="input_name" @input="onInput" placeholder="Name...">
			<input type="email" id="input_email" @input="onInput" placeholder="Email...">

			<button @click="show">Print</button>
		`
	}

	style() {
		return /*css*/`
			:host {
				max-width: 16rem;

				display: flex;
				flex-direction: column;
				gap: .4rem;

				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		`
	}

	methods() {
		return {
			onInput(e) {
				console.log(e.target.value)
			},
			show() {
				console.log({
					name: this.$refs.input_name.value,
					email: this.$refs.input_email.value
				})
			}
		}
	}
})

console.log(Component(null, class {}).$tag)