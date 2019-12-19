<template>
  <main class="container">
    <!-- Overview -->
    <section class="overview">
      <div class="overview--items">
        <h2>Shopping Cart</h2>
        <span id="cart-item-count">{{ itemsAmount }} {{ itemsAmount > 1 ? 'items' : 'item' }}</span>
      </div>
      <div class="overview--subtotal">
        <h2>${{ totalPrice }}</h2>
        <span>Subtotal</span>
      </div>
      <div class="overview--buttons">
        <button
          type="button"
          name="button"
          class="btn btn--secondary"
        >
          Continue shopping
        </button>
        <button
          type="button"
          name="button"
          class="btn btn--primary"
        >
          Proceed to checkout
        </button>
      </div>
    </section>

    <!-- Order -->
    <section class="order">
      <div class="order__labels">
        <div class="order__labels--product">
          <h6>Product</h6>
        </div>
        <div class="order__labels--other">
          <span>Quantity</span>
          <span>Item Price</span>
          <span>Total</span>
        </div>
      </div>
    </section>

    <!-- Cart items -->
    <section class="order--item">
      <div v-if="data.items.length">
        <CartItem
          v-for="item in data.items"
          :key="item.id"
          :item="item"
          @increment-quantity="incrementQuantity"
          @decrement-quantity="decrementQuantity"
          @save-for-later="saveForLater"
          @remove="remove"
        />
      </div>
      <div
        v-else
        class="cart__empty"
      >
        <h6>There are no items in your cart.</h6>
      </div>
    </section>

    <!-- Cart summary -->
    <section class="summary">
      <div class="summary__notices">
        <span class="summary__notice">
          This order qualifies for FREE Standard shipping! <a href="#">Learn more</a>
        </span>
        <span class="summary__notice">
          <strong>Have a coupon?</strong>
          Apply your code in the Payment section of checkout.
        </span>
        <span class="summary__notice">
          <strong>Is this order a gift?</strong>
          Select gift options in the shipping section of checkout.
          <a>Learn more</a>
        </span>
      </div>
      <div class="summary__checkout">
        <div class="summary__shipping">
          <span>FREE shipping</span>
          <span><strong>$0.00</strong></span>
        </div>
        <div class="summary__subtotal">
          <h6>Subtotal</h6>
          <h6>${{ totalPrice }}</h6>
        </div>
        <button
          type="button"
          name="button"
          class="btn btn--primary"
        >
          Proceed to checkout
        </button>
      </div>
    </section>

    <!-- Master card summary -->
    <section class="summary--card">
      <img src="../assets/mastercard.png" title="REI Master Card" alt="picture of REI credit card">
      <span class="card__summary">
        <p>Apply for the REI Co-op Mastercard and you could be instantly approved and earn a $100 REI gift card</p>
        <p>Upon approval, you'll also get 5% back on this purchase. Plus, you'll get 1% back everywhere else you use your card. <a href="javascript:;">Learn more & apply now.</a></p>
      </span>
    </section>
    <!-- Order -->
    <section class="order">
      <div class="order__labels">
        <div class="order__labels--product">
          <h6>Saved for later</h6>
        </div>
        <div class="order__labels--other">
          <span>Quantity</span>
          <span>Item Price</span>
          <span>Total</span>
        </div>
      </div>
    </section>
    <!-- Saved items -->
    <section class="order--item">
      <div v-if="data.savedItems.length">
        <SavedItem
          v-for="item in data.savedItems"
          :key="item.id"
          :item="item"
          @remove-from-saved="removeFromSaved"
          @move-to-cart="moveToCart"
        />
      </div>
      <div
        v-else
        class="cart__empty"
      >
        <h6>There are no items in your cart.</h6>
      </div>
    </section>
  </main>
</template>

<script>
import mockData from '../../mockData.json';
import CartItem from './CartItem.vue';
import SavedItem from './SavedItem.vue';

export default {
  name: 'Cart',
  components: {
    CartItem,
    SavedItem,
  },
  data() {
    return {
      data: mockData,
    };
  },
  computed: {
    /*
    Returns the total amount of items in the cart.
    */
    itemsAmount() {
      const quantities = this.data.items.map(item => item.quantity);
      let total = 0;
      if (quantities.length) {
        total = quantities.reduce((a, b) => a + b);
      }
      return total;
    },

    /* Calculates the total price of the cart */
    totalPrice() {
      let total = 0;
      this.data.items.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toFixed(2);
    },
  },
  methods: {
    /*
    On the increment-quantity event, increase the item quantity by 1.
    */
    incrementQuantity(cartItemId) {
      const itemToIncrement = this.data.items.find(cartItem => cartItem.id === cartItemId);
      itemToIncrement.quantity += 1;
    },

    /*
    On the decrement-quantity event, decrease the item quantity by 1.
    */
    decrementQuantity(cartItemId) {
      const itemToDecrement = this.data.items.find(cartItem => cartItem.id === cartItemId);
      itemToDecrement.quantity -= 1;
    },

    /*
    On the save-for-later event, move the item out of the cart and into the savedItems.
    */
    saveForLater(cartItemId) {
      const itemIndex = this.data.items.findIndex(cartItem => cartItem.id === cartItemId);
      const savedItem = { ...this.data.items[itemIndex] };
      this.data.savedItems.push(savedItem);
      this.data.items.splice(itemIndex, 1);
    },

    /*
    On the remove event, remove the item from the cart.
    */
    remove(cartItemId) {
      const itemIndex = this.data.items.findIndex(cartItem => cartItem.id === cartItemId);
      this.data.items.splice(itemIndex, 1);
    },

    /*
    On the move-to-cart event, remove the item out of savedItems and into cart items.
    */
    moveToCart(payload) {
      const itemIndex = this.data.savedItems.findIndex(cartItem => cartItem.id === payload);
      const cartItem = { ...this.data.savedItems[itemIndex] };
      this.data.items.push(cartItem);
      this.data.savedItems.splice(itemIndex, 1);
    },

    /*
    On the remove-from-saved event, remove the item out of savedItems.
    */
    removeFromSaved(payload) {
      const itemIndex = this.data.items.findIndex(cartItem => cartItem.id === payload);
      this.data.savedItems.splice(itemIndex, 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/Cart.scss';
</style>
