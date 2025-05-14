import React from "react";

type ProductProps = {
  title: string;
  price: string;
  description: string;
  image: string;
  featuredProducts: { image: string; title: string; price: string }[];
};

const Shop: React.FC<ProductProps> = ({
  title,
  price,
  description,
  image,
  featuredProducts,
}) => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Product Section */}
      <section className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={image}
            alt={title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-gray-500 mb-4">{description}</p>
          <span className="text-xl font-semibold text-green-500 mb-6">
            {price}
          </span>
          <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600">
            Add To Cart
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mt-12">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Featured Products</h2>
          <button className="text-teal-500 hover:underline">View all</button>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {featuredProducts.map((product, index) => (
            <article
              key={index}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-38 object-cover mb-2 rounded"
              />
              <h3 className="text-sm font-medium mb-1">{product.title}</h3>
              <span className="text-sm font-semibold text-gray-700">
                {product.price}
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

// Featured Products Array
const featuredProducts = [
  {
    image: "/images/black grey.png", // image path for the first product
    title: "Product 1",
    price: "$19.99",
  },
  {
    image: "/images/line 2.jpeg", // image path for the third product
    title: "Product 3",
    price: "$39.99",
  },
  {
    image: "/images/line 3.png", // image path for the fourth product
    title: "Product 4",
    price: "$49.99",
  },
  {
    image: "/images/grey wood2.png", // image path for the fourth product
    title: "Product 5",
    price: "$49.99",
  },
];

// Example usage of the Shop component
const App: React.FC = () => {
  return (
    <Shop
      title="Library Stool Chair"
      price="$99.99"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim. Lorem ipsum dolor sit amet, consectetur adipiscing."
      image="/images/line 2.jpeg"
      featuredProducts={featuredProducts}
    />
  );
};

export default App;
