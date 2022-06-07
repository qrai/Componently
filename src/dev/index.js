import { Component } from '../framework/index'

Component('my-counter', class {
	render() {
		return /*html*/`
			<p>Clicked ${this.$state.count} times</p>
		`
	}

	events() {
		return {
			click() {
				this.$state.count++
			}
		}
	}

	props() {
		return {
			'value': (val) => parseInt(val, 10)
		}
	}

	state() {
		return {
			count: this.$props.value || 0
		}
	}
})