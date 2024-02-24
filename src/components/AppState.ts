import {Model} from './base/Model';
import {IAppState, IOrder, ICard, ICardItem, FormErrors, IOrderForm, IContactsForm} from '../types'

 class AppState extends Model<IAppState> {
    cardList: CardItem[];
    basket: CardItem[] = [];
    order: IOrder = {payment: 'online', address: '', email: '', phone: '', total: 0, items: []};
    preview: string | null;
    formErrors: FormErrors = {};
 
    setCatalog(items: ICardItem[]) {
		this.cardList = items.map(item => new CardItem(item, this.events));
		this.emitChanges('items:changed', { catalog: this.cardList });
    }
    
    setPreview(item: CardItem) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    } 
    
}

 class CardItem extends Model<ICardItem> {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number | null;
}

export {AppState, CardItem}
