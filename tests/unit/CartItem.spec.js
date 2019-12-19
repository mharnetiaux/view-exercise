import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import CartItem from '@/components/CartItem.vue';

const props = {
  id: 4,
  quantity: 1,
  price: 299.95,
  brand: 'Osprey',
  name: 'Deva 60 Pack - Women\'s',
  color: 'Plum Red',
  size: 'Xs',
  sku: '1340720001',
  img: 'product-1.jpeg',
};

describe('CartItem.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CartItem, {
      propsData: {
        item: props,
      },
    });
  });

  it('increments the item quantity when increment-quantity is emitted', () => {
    wrapper.find('#increment-1340720001').trigger('click');
    expect(wrapper.emitted('increment-quantity')[0]).to.deep.equal([4]);
  });

  it('emits the decrement-quantity event with the item index when the decrement button is pressed', () => {
    wrapper.find('#decrement-1340720001').trigger('click');
    expect(wrapper.emitted('decrement-quantity')[0]).to.deep.equal([4]);
  });

  it('emits the save-for-later event with the item index when the save for later button is pressed', () => {
    wrapper.find('#save-for-later-btn-1340720001').trigger('click');
    expect(wrapper.emitted('save-for-later')[0]).to.deep.equal([4]);
  });

  it('emits the remove event with the item index when the remove button is pressed', () => {
    wrapper.find('#remove-btn-1340720001').trigger('click');
    expect(wrapper.emitted('remove')[0]).to.deep.equal([4]);
  });
});
