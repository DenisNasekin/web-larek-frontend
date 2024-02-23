import {Form} from './form';
import {IActions, IOrderForm} from '../types';
import {ensureElement} from '../utils/utils';
import {IEvents} from './base/events';

export class Order extends Form<IOrderForm> {
	protected _onlineCard: HTMLButtonElement;
	protected _oflineCash: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents, actions?: IActions) {
		super(container, events);

		this._onlineCard = ensureElement<HTMLButtonElement>(
			'button[name="card"]',
			this.container
		);
		this._oflineCash = ensureElement<HTMLButtonElement>(
			'button[name="cash"]',
			this.container
		);
		this._oflineCash.classList.add('button_alt-active');

		if (actions?.onClick) {
			this._onlineCard.addEventListener('click', actions.onClick);
			this._oflineCash.addEventListener('click', actions.onClick);
		}
	}

	toggleButtons(name: HTMLElement) {
		this._onlineCard.classList.toggle('button_alt-active');
		this._oflineCash.classList.toggle('button_alt-active');
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}
