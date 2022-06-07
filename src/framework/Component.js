export default function Component(tag, component) {
	const _class = new component()

	// Make class
	let VegtexComponent = class extends HTMLElement {
		constructor() {
			super()
	
			// Shadow DOM
			this.$shadow = this.attachShadow({ mode: 'closed' })
			this.$shadow.addEventListener('slotchange', this.$render)
	
			// Events
			if(_class.events && typeof _class.events === 'function') {
				this.$handlers = _class.events.bind(this)()

				Object.keys(this.$handlers).forEach(eventName => {
					this.addEventListener(eventName, () => {
						this.$handlers[eventName]?.bind(this)()
					})
				})
			}
	
			// Props
			if(_class.props && typeof _class.props === 'function') {
				this.$propsTranformers = _class.props.bind(this)()

				// Init props values
				this.$props = {}

				// Set props value based on initial attributes
				Object.keys(this.$propsTranformers).forEach(propName => {
					this.$props[propName] = this.#transformProperty(propName, this.getAttribute(propName))
				})
			}

			// State
			this.$state = new Proxy(_class.state?.bind(this)() || {}, {
				get: (target, name) => target[name],
				set: (target, name, value) => {
					if(target[name] !== undefined) {
						// Update value
						target[name] = value
						// Rerender
						this.$render()
						// Success
						return true
					}
					else
						return false
				}
			})

			// Initial render
			this.$render()
		}

		#transformProperty(propName, propValue) {
			if(!propName || !propValue)
				return null
			else
				return this.$propsTranformers[propName] ? this.$propsTranformers[propName](propValue) : null
		}

		$render() {
			// Move from inner to shadow
			this.$shadow.innerHTML = _class.render?.bind(this)() || ''
	
			// Clear inner
			//this.innerHTML = ''
	
			// Find referenced elements
			this.$refs = {}
			this.$shadow.querySelectorAll('[id]').forEach(refElement => {
				this.$refs[refElement.getAttribute('id')] = refElement
			})
		}
	
		$emit(eventName, argument) {
			let coreEvents = [
				'mounted',
				'unmounted',
				'adopted'
			]
	
			// Core events
			if(coreEvents.includes(eventName))
				_class[eventName]?.bind(this)()
			// HTML events
			else
				this.dispatchEvent(new CustomEvent(eventName, argument))
		}
	
		connectedCallback() {
			this.$emit('mounted')
		}
		disconnectedCallback() {
			this.$emit('unmounted')
		}
		adoptedCallback() {
			this.$emit('adopted')
		}
		attributeChangedCallback(attr, oldValue, newValue) {
			// Property exists in props
			if(_class.props && _class.props[attr]) {
				// Set value of prop in $props
				this.$props[propName] = this.#transformProperty(attr, newValue)
			}
		}
	}

	// Define (If not defined yet)
	if(!window.customElements.get(tag))
		window.customElements.define(tag, VegtexComponent)

	return VegtexComponent
}