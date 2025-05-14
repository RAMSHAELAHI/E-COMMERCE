
import Categories from "@/components/Categories";
import CompanyLogo from "@/components/companyLogo";
import Header from "@/components/Header";
import HotProduct from "@/components/hotProducts";
import Instagram from "@/components/Instagram";
import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
import SingleProductPages from "@/components/SingleProductPages"
import Cart from "@/components/Cart"
import Contact from "@/components/Contact"
import Faqs from "@/components/faqs";
import AboutSection from "@/components/aboutSection";
import AboutPopularProduct from "@/components/aboutPopularProducts";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ContactSection from "@/components/contactSection";
import ProductCards from "./Products/page";

export default function Home() {
  return (
    <>
<Topbar/>
<Navbar/>
<Header/>
<Hero/>
<CompanyLogo/>
<ProductCards/>
<Categories/>
<HotProduct/>
<Instagram/>
<SingleProductPages/>
<Cart/>
<Contact/>
<ContactSection/>
<Faqs/>
<AboutSection/>
<AboutPopularProduct/>


<Footer/>

    </>
  );
}
