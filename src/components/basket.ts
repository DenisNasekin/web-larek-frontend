import {Component} from './base/component';
import {createElement, ensureElement} from './../utils/utils';
import {IBasket} from '../types';
import {EventEmitter} from './base/events';
import{Card} from './card'

export class Basket extends Component<IBasket> {
  protected _list: HTMLElement;
  protected _button: HTMLButtonElement;
  protected _total: HTMLElement;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container);
	this._list = ensureElement<HTMLElement>('.basket__list', this.container);
	this._button = this.container.querySelector('.basket__button');
    this._total = this.container.querySelector('.basket__price');

    if(this._button) {
        this._button,addEventListener('click', () => {events.emit('order:open')});
    }
    
    this.items = [];
    this._button.disabled = true;
  }

  //Вставляем данные в корзину
  set items(items: HTMLElement[]) {
    if (items.length) {
        this._list.replaceChildren(...items);
    } else {
        this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {textContent: 'Корзина пуста',}));
    }
  }

  //Устанавливаем общую сумму товаров в корзине
  set total(total: number) {
    this.setText(this._total, `${total.toString()} синапсов`);
  }

  //Устанавливаем наличие товаров в корзине
  set selected(items: Card[]) {
    if (items.length) {
        this.setDisabled(this._button, false);
    } else {
        this.setDisabled(this._button, true);
    }
  }
}

