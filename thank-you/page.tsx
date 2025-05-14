"use client";

import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/constants/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from 'framer-motion';
import {
    MapPin,
    Phone,
    Mail,
    Loader2,
    CheckCircle,
    XCircle,
    CreditCard,
    ShoppingCart,
    ChevronRight
} from 'lucide-react';

// ===============================
// Context for Cart Management
// ===============================

interface CartItem {
    _id: string;
    imgUrl: string;
    title: string;
    price: number;
    quantity: number;
    weight?: string;
}

interface CartContextProps {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    clearCart: () => void;
    getTotalItems: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addToCart = useCallback((item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i._id === item._id);
            if (existingItem) {
                return prevItems.map(i =>
                    i._id === item._id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            } else {
                return [...prevItems, item];
            }
        });
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const getTotalItems = useCallback(() => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }, [cartItems]);

    const contextValue = {
        cartItems,
        addToCart,
        clearCart,
        getTotalItems,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// ===============================
// Mock Data (for demonstration)
// ===============================

const mockCartItems: CartItem[] = [
    {
        _id: '1',
        imgUrl: 'https://via.placeholder.com/150',
        title: 'Product 1',
        price: 25.99,
        quantity: 2,
        weight: '1 kg'
    },
    {
        _id: '2',
        imgUrl: 'https://via.placeholder.com/150',
        title: 'Product 2',
        price: 19.99,
        quantity: 1,
        weight: '500g'
    },
    {
        _id: '3',
        imgUrl: 'https://via.placeholder.com/150',
        title: 'Product 3',
        price: 49.99,
        quantity: 3,
        weight: '2 kg'
    }
];

// ===============================
// Components
// ===============================

interface CheckoutForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    zipCode: string;
    country: string;
}

const CheckoutPage = ({ onOrderConfirmation }: { onOrderConfirmation: (orderId: string) => void }) => {
    const { cartItems, clearCart } = useCart();
    const [formData, setFormData] = useState<CheckoutForm>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        zipCode: "",
        country: "",
    });
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Calculate order summary
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0.25 * subtotal;
    const tax = 0.1 * subtotal;
    const total = (subtotal - discount + tax).toFixed(2);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Validation function
    const validateForm = (data: CheckoutForm) => {
        const errors: string[] = [];
        if (!data.firstName.trim()) errors.push("First Name is required.");
        if (!data.lastName.trim()) errors.push("Last Name is required.");
        if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("Valid Email is required.");
        if (!data.phone.trim()) errors.push("Phone Number is required.");
        if (!data.address1.trim()) errors.push("Address Line 1 is required.");
        if (!data.city.trim()) errors.push("City is required.");
        if (!data.zipCode.trim()) errors.push("Zip Code is required.");
        if (!data.country.trim()) errors.push("Country is required.");

        return errors;
    };

    const handlePlaceOrder = async () => {
        const validationErrors = validateForm(formData);
        if (validationErrors.length > 0) {
            setError(validationErrors.join(" ")); // Combine errors
            return;
        }
        setError(null);
        setIsOrderPlaced(true);

        try {
            // Simulate order processing (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2s delay

            // Generate a mock order ID
            const orderId = `ORDER-${Math.random().toString(36).substring(7).toUpperCase()}`;
            onOrderConfirmation(orderId); // Pass order ID
            clearCart(); // Clear the cart
        } catch (error: any) {
            setError(error.message || "An error occurred while placing your order. Please try again.");
            setIsOrderPlaced(false);
            console.error("Error placing order:", error);
        }
    };

    const orderSummaryData = cartItems.map((item) => ({
        id: item._id,
        img: item.imgUrl,
        title: item.title,
        weight: item.weight || 'N/A', // Use optional weight
        price: item.price.toFixed(2), // Ensure price is formatted
        quantity: item.quantity
    }));

    useEffect(() => {
        if (cartItems.length === 0) {
            // Redirect to home if cart is empty
            window.location.href = '/';
        }
    }, [cartItems.length]);

    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block text-yellow-500">Checkout</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                        Complete your order by providing your shipping and payment details.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Shipping Address Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="space-y-6"
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                                <MapPin className="w-6 h-6 mr-2 text-yellow-500" />
                                Shipping Address
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        type="text"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        type="text"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        type="text"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="address1">Address Line 1</Label>
                                    <Input
                                        type="text"
                                        id="address1"
                                        value={formData.address1}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="address2">Address Line 2</Label>
                                    <Input
                                        type="text"
                                        id="address2"
                                        value={formData.address2}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        type="text"
                                        id="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="zipCode">Zip Code</Label>
                                    <Input
                                        type="text"
                                        id="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Select
                                        value={formData.country}
                                       onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}

                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USA">United States</SelectItem>
                                            <SelectItem value="Canada">Canada</SelectItem>
                                            {/* Add more countries */}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <Button onClick={handlePlaceOrder} disabled={isOrderPlaced} className="w-full max-w-xs">
                                    {isOrderPlaced ? <Loader2 className="animate-spin w-6 h-6" /> : 'Place Order'}
                                </Button>
                            </div>

                            {error && (
                                <div className="mt-4">
                                    <Alert>
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="space-y-6"
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                                <ShoppingCart className="w-6 h-6 mr-2 text-yellow-500" />
                                Order Summary
                            </h2>

                            <div className="space-y-4">
                                {orderSummaryData.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img src={item.img} alt={item.title} className="w-12 h-12 object-cover rounded-md mr-4" />
                                            <span className="text-lg font-medium">{item.title}</span>
                                        </div>
                                        <span className="text-lg">${item.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t mt-6 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-lg">Subtotal</span>
                                    <span className="text-lg">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-lg">Discount (25%)</span>
                                    <span className="text-lg text-red-500">-${discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-lg">Tax (10%)</span>
                                    <span className="text-lg">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <span className="text-lg font-semibold">Total</span>
                                    <span className="text-lg font-semibold">${total}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export { CartProvider, useCart, CheckoutPage };
