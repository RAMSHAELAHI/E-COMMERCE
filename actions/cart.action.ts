'use server';

import { auth } from '@/auth';
import  prisma  from 'db/prisma';
import { formatError} from '@/lib/constants/utils';

export async function getMyCart() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error('User not authenticated');

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: true },
      });
    }

    return cart;
  } catch (error) {
    console.error('getMyCart error:', formatError(error));
    return null;
  }
}

export async function addToCart(productId: string, qty: number = 1) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error('User not authenticated');

    const cart = await getMyCart();
    const existingItem = cart?.items.find((item: { productId: string; }) => item.productId === productId);

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { qty: existingItem.qty + qty },
      });
    } else {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) throw new Error('Product not found');

      await prisma.cartItem.create({
        data: {
          cartId: cart!.id,
          productId,
          name: product.name,
          slug: product.slug,
          image: product.images[0],
          price: product.price,
          qty,
        },
      });
    }

    await recalculateCartTotals(cart!.id);

    return { success: true, message: 'Item added to cart' };
  } catch (error) {
    console.error('addToCart error:', formatError(error));
    return { success: false, message: formatError(error) };
  }
}

export async function removeFromCart(itemId: string) {
  try {
    const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item) return { success: false, message: 'Item not found' };

    await prisma.cartItem.delete({ where: { id: itemId } });
    await recalculateCartTotals(item.cartId);

    return { success: true, message: 'Item removed from cart' };
  } catch (error) {
    console.error('removeFromCart error:', formatError(error));
    return { success: false, message: formatError(error) };
  }
}

export async function clearCart() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error('User not authenticated');

    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) return { success: false, message: 'Cart not found' };

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
      },
    });

    return { success: true, message: 'Cart cleared' };
  } catch (error) {
    console.error('clearCart error:', formatError(error));
    return { success: false, message: formatError(error) };
  }
}

async function recalculateCartTotals(cartId: string) {
  const items = await prisma.cartItem.findMany({ where: { cartId } });

  const itemsPrice = items.reduce((total: number, item: { price: number; qty: number; }) => total + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = parseFloat((0.15 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  await prisma.cart.update({
    where: { id: cartId },
    data: {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    },
  });
}
