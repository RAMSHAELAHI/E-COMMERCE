import React from "react";
import Link from "next/link";
import Header from "./Header";

interface propstype{
    title: string;
    subtitle: string;
}

const Common: React.FC<propstype> = ({ title,subtitle}: propstype) => {
    return (
      <div>
        <Header />
      <div
        className="md:max-w-[1920px] h-[410px] w-full"
        style={{ backgroundImage: "url('/images/bg_cover.png')" }}
      >
        <div className="w-full h-[104px] top-[-198] text-center left-[850]">
          <h1 className="font-bold text-[48px] w-full pt-[18%] text-white">{title}</h1>
          <div className="flex w-full text-white gap-2 md:pl-[47%] pl-[35%]">
            <Link href="/">
              <span className="text-white">Home</span>
            </Link>
            &gt;
            <span className="text-[#FF9F0D]">{subtitle}</span>
          </div>
        </div>
      </div>
      </div>
    );
  };

  export default Common;