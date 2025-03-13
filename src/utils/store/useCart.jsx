import { create } from "zustand";
import supabase from "../supaClient";

export const useCart = create((set, get) => ({
  cart: [],

  fetchCart: async (userId) => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("cart")
      .select(
        "id, quantity, id_product, product: id_product (product_name, price, img)"
      )
      .eq("id_user", userId);

    if (error) {
      console.error("Error fetching cart:", error.message);
      return;
    }

    set({ cart: data });
  },

  addToCart: async (product, userId) => {
    if (!userId) {
      console.error("User ID is required to add to cart");
      return;
    }

    const { cart, fetchCart } = get();
    const existingItem = cart.find((item) => item.id_product === product.id);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + 1;

      const { error } = await supabase
        .from("cart")
        .update({ quantity: updatedQuantity })
        .eq("id_product", existingItem.id_product)
        .eq("id_user", userId);

      if (error) {
        console.error("Error updating cart:", error.message);
        return;
      }

      set((state) => ({
        cart: state.cart.map((cartItem) =>
          cartItem.id_product === existingItem.id_product
            ? { ...cartItem, quantity: updatedQuantity }
            : cartItem
        ),
      }));
    } else {
      const newItem = {
        id_product: product.id,
        id_user: userId,
        quantity: 1,
      };

      const { error } = await supabase.from("cart").insert([newItem]);

      if (error) {
        console.error("Error adding to cart:", error.message);
        return;
      }

      await fetchCart(userId);
    }
  },
}));
