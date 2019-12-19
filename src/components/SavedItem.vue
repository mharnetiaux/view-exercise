<template>
  <div class="saved">
    <div class="saved__details">
      <figure class="saved__details__image">
        <img
          :src="productImage"
          alt=""
        >
      </figure>
      <div class="saved__details__item">
        <a
          href="#"
          class="saved__details__name"
        >
          <span class="saved__details__brand">{{ item.brand }}</span>
          {{item.name}}
        </a>
        <span class="saved__details__color">{{ item.color }}</span>
        <span class="saved__details__size">{{ item.size }}</span>
        <span class="saved__details__sku">#{{ item.sku }}</span>

        <div class="saved__details__buttons">
          <button
            :id="`move-to-cart-btn-${item.sku}`"
            type="button"
            name=""
            class="btn btn--small"
            @click="moveToCart"
          >
            Move to cart
          </button>
          <button
            :id="`remove-btn-${item.sku}`"
            type="button"
            name=""
            class="btn btn--small"
            @click="removeFromSaved"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    <div class="saved__options">
      <div class="saved__options__inner">
        <div class="saved__options__row saved__options__row--pricing">
          <div class="saved__options__quantity">
            <span>{{ item.quantity }}</span>
          </div>
          <div class="saved__options__price">
            <span>${{ formattedPrice }}</span>
          </div>
          <div class="saved__options__total">
            <span>${{ totalPrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'SavedItem',
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    /*
    Comes up with a unique input name attribute for each item's radio buttons
    */
    inputName() {
      return `name-${this.item.id}`;
    },

    /*
    Provides the image path for the product image
    */
    productImage() {
      // return import `@/assets/${this.item.img}`;
      return require(`@/assets/${this.item.img}`);
    },

    /* Formats the price number so it's padded with zeroes
     */
    formattedPrice() {
      return this.item.price.toFixed(2);
    },

    /* Calculates the total price of the product */
    totalPrice() {
      const total = this.item.price * this.item.quantity;
      return total.toFixed(2);
    },
  },
  methods: {
    /*
    (#remove-save-btn) is clicked
    Emits an event to remove obj in saved items array of objects
    */
    removeFromSaved() {
      this.$emit('remove-from-saved', this.item.id);
    },

    /*
    (#move-to-cart-btn) is clicked
    Emits an event to move saved to items array of objects
    */
    moveToCart() {
      this.$emit('move-to-cart', this.item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/SavedItem.scss';
</style>
