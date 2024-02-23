import { Component } from './base/component';
import { ICard, IActions } from '../types';
import { ensureElement } from '../utils/utils';

export class Card extends Component<ICard> {
    protected _description: HTMLElement;
    protected _image: HTMLImageElement;
    protected _title: HTMLElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
    
    constructor(container: HTMLElement, actions?: IActions) {
        super(container);
    
    this._description = container.querySelector('.card__text');
    this._image = container.<HTMLImageElement>('.card__image');
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._category = container.<HTMLElement>('.card__category');
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._button = container.querySelector('.card__button');

    if (actions?.onClick) {
        if (this._button) {
            this._button.addEventListener('click', (actions.onClick));
        } else {
            container.addEventListener('click', actions.onClick);
          }
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set description(value: string) {
        this.setText(this._description, value);
    }
   
    set category(value: string) {
        this.setText(this._category, value);
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title);
    }

    set price(value: number | null) {
        this.setText(this._price, value);
    }

    get price(): number {
        return Number(this._price.textContent || '');
    }

    disablePriceButton(value: number | null) {
        if (!value) {
			if (this._button) this._button.disabled = true;
		}
    }

    set buttonTitle(value: string) {
        if (this._button) this._button.textContent = value;
	}
}