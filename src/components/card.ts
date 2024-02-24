import {Component} from './base/component';
import {ICard, IActions, ICardPreview, ICardBasket} from '../types';
import { ensureElement } from '../utils/utils';

class Card<T> extends Component<ICard> {
    protected _category: HTMLElement;
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _price: HTMLElement;
    
    constructor(container: HTMLElement, actions?: IActions) {
        super(container);
        this._category = container.querySelector('.card__category');
        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._image = container.querySelector('.card__image');
        this._price = ensureElement<HTMLElement>('.card__price', container);
    if (actions?.onClick) container.addEventListener('click', actions.onClick);
    }
    
    set category(value: string) {this.setText(this._category, value);}

    set title(value: string) {this.setText(this._title, value);}

    set image(value: string) {this.setImage(this._image, value, this.title);}

    set price(value: number | null) {this.setText(this._price, value ? `${value.toString()} синапсов` : 'Бесценно');}
}

class CardPreview extends Card<ICardPreview> {
    protected _text: HTMLElement;
    protected _button: HTMLElement;
    
    constructor(container: HTMLElement, actions?: IActions) {
        super(container, actions)
        this._button = container.querySelector(`.card__button`);
        this._text = ensureElement<HTMLElement>(`.card__text`, container);
    if (actions?.onClick) {
        if (this._button) {
            container.removeEventListener('click', actions.onClick);
            this._button.addEventListener('click', actions.onClick);
            } 
        }
    }
  
    set text(value: string) {
      this.setText(this._text, value);
    }
}

class CardBasket extends Component<ICardBasket> {
    protected _index: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLElement;
    
    constructor(container: HTMLElement, actions?: IActions) {
        super(container);
        this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
        this._title = ensureElement<HTMLElement>(`.card__title`, container);
        this._price = ensureElement<HTMLElement>(`.card__price`, container);
        this._button = container.querySelector(`.card__button`);
    if (actions?.onClick) {
        if (this._button) {
            container.removeEventListener('click', actions.onClick);
            this._button.addEventListener('click', actions.onClick);
            } 
        }
    }
  
    set index(value: number) {this.setText(this._index, value);}
  
    set title(value: string) {this.setText(this._title, value);}
  
    set price(value: number | null) {this.setText(this._price, value ? `${value.toString()} синапсов` : 'Бесценно');}
  }

export {Card, CardPreview, CardBasket}