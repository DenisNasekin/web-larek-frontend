import {Form} from './form';
import {IOrderForm, IActions} from '../types';
import {ensureAllElements} from '../utils/utils';
import {IEvents} from './base/events';

export class Order extends Form<IOrderForm> {
	protected _buttons: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this._buttons = ensureAllElements<HTMLButtonElement>('.button_alt', container);
		this._buttons.forEach(button => {
			button.addEventListener('click', () => {
			  this.payment = button.name; 
			  events.emit('payment:change', button)
			});
		})
	}
	set payment(name: string) {
		this._buttons.forEach(button => {
		  this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	  }
	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value = value;
	}	
}