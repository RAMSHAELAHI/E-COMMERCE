// @/lib/actions/order.actions.ts

import { insertOrderSchema } from "@/lib/validators";  // Import schema
import  prisma  from "db/prisma";  // Assuming Prisma is set up
import { getMyCart } from "./cart.action";  // Assuming cart action is set up
import { formatError } from "@/lib/constants/utils";  // Assuming formatError utility exists
import { auth } from "@/auth";  // Assuming auth is set up
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { revalidatePath } from 'next/cache';
import { getUserById } from "./user.actions";

export async function createOrder() {
  try {
    // Get session and userId
    const session = await auth();
    if (!session) throw new Error('User is not authenticated');

    const userId = session?.user?.id;
    if (!userId) throw new Error('User not found');

    // Get user by ID (assume you have a getUserById method)
    const user = await getUserById(userId);

    // Get the existing cart from the database
    const cart = await getMyCart();
    if (!cart || cart.items.length === 0) {
      return { success: false, message: 'Cart is empty', redirectTo: '/cart' };
    }

    if (!user.address) {
      return { success: false, message: 'No shipping address', redirectTo: '/shipping-address' };
    }

    if (!user.paymentMethod) {
      return { success: false, message: 'No Payment method', redirectTo: '/payment-method' };
    }

    // Validate order using the insertOrderSchema
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    // Perform the transaction to insert the order
    const insertedOrderId = await prisma.$transaction(async (tx: { order: { create: (arg0: { data: { paymentMethod: string; userId: string; shippingAddress: string; itemsPrice: string; shippingPrice: string; taxPrice: string; totalPrice: string; }; }) => any; }; orderItem: { create: (arg0: { data: { order: { connect: { id: any; }; }; product: { connect: { id: any; }; }; qty: any; price: any; name: any; slug: any; image: any; }; }) => any; }; cart: { update: (arg0: { where: { id: any; }; data: { items: never[]; itemsPrice: number; taxPrice: number; shippingPrice: number; totalPrice: number; }; }) => any; }; }) => {
      const insertedOrder = await tx.order.create({ data: order });

      // Insert items into the orderItem table
      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            order: { connect: { id: insertedOrder.id } },
            product: { connect: { id: item.productId } },
            qty: item.qty,
            price: item.price,
            name: item.name,
            slug: item.slug,
            image: item.image,
          },
        });
      }

      // Clear the cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          itemsPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
          totalPrice: 0,
        },
      });

      return insertedOrder.id;
    });

    if (!insertedOrderId) throw new Error('Order not created');

    return { success: true, message: 'Order created successfully', redirectTo: `/order/${insertedOrderId}` };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: formatError(error) };
  }
}
