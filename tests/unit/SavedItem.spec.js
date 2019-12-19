import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import SavedItem from '@/components/SavedItem.vue';

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

describe('SavedItem.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SavedItem, {
      propsData: {
        item: props,
      },
    });
  });

  it('when "move to cart" button is clicked, emits the "move-to-cart" event with the correct item id.', () => {
    wrapper.find('#move-to-cart-btn-1340720001').trigger('click');
    expect(wrapper.emitted('move-to-cart')[0]).to.deep.equal([4]);
  });

  it('when "remove" button is clicked, emits the "remove" event with the correct item id.', () => {
    wrapper.find('#remove-btn-1340720001').trigger('click');
    expect(wrapper.emitted('remove-from-saved')[0]).to.deep.equal([4]);
  });
});
