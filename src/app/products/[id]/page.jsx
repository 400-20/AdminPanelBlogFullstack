"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const PER_PAGE = 6;

const Page = () => {
    const router = useRouter();
    const { id } = router.query;

    const products = [
        {
            id: 0,
            title: "Battery Energy Storage System",
            description:
                "Our Lithium Battery Energy Storage System (BESS) is a comprehensive solution tailored for various energy storage needs.",
            images: [
                "/assets/images/__img1.jpg",
                "/assets/images/__img2.jpg",
                "/assets/images/__img3.jpg",
                "/assets/images/__img1.jpg",
            ],
            features: [
                {
                    title: "Advanced Battery Management Technology",
                    content:
                        "Highly Integrated Chips & Unique Algorithm: We employ advanced chips coupled with a unique battery equalization algorithm. This combination allows for bidirectional, large-current equalization, reaching currents up to 3A.",
                },
                {
                    title: "Active Safety Technology",
                    content:
                        "Intelligent Fire Protection: At the pack level, our BESS features an intelligent fire protection system.",
                },
                {
                    title: "Energy Management & Coordinated Control Technology",
                    content:
                        "Comprehensive Data Handling: Our system is adept at data acquisition, computation, event management, and processing.",
                },
            ],
        },
        // Add more product data here
    ];

    const product = products[id];

    const [currentImage, setCurrentImage] = useState(product.images[0]);

    const handleImageClick = (image) => {
        setCurrentImage(image);
    };

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerPadding: "30px",
        arrows: true,
        responsive: [
            {
                breakpoint: 1424,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "30px",
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "20px",
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "10px",
                },
            },
            // Add more responsive settings as needed
        ],
    };

    return (
        <>
            <section className="md:mt-0 services-images min-h-[40vh] bg-[#0a890d] my-auto text-white">
                <div className="container mx-auto flex flex-col justify-center items-center py-12">
                    <h2 className="text-[20px] md:text-5xl font-bold mb-4 text-green">
                        {product.title}
                    </h2>
                    <p className="mx-auto text-center text-lg text-dark font-semibold">
                        {product.description}
                    </p>
                </div>
            </section>

            <section className="flex w-full xl:px-[300px] px-4 h-[55vh] main_section py-[50px] gap-2">
                <div className="flex flex-col w-28 h-full gap-4 left_section">
                    {product.images.map((image, index) => (
                        <div
                            key={index}
                            className="small cursor-pointer"
                            onClick={() => handleImageClick(image)}
                        >
                            <Image
                                src={image}
                                alt={`Sample ${index + 1}`}
                                width={90}
                                height={90}
                                className="rounded-lg"
                            />
                        </div>
                    ))}
                </div>
                <div className="relative w-[27rem] h-[27rem] mid_section">
                    <Image
                        src={currentImage}
                        alt="Current"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg"
                    />
                </div>
                <div className="flex-1 ml-5 right_section md:text-[20px] text-[10px]">
                    <h1 className="text-[#002202] text-2xl font-bold">{product.title}</h1>
                    <p>{product.description}</p>
                    {product.features.map((feature, index) => (
                        <div key={index}>
                            <h1 className="text-[#002202] text-xl font-bold">
                                {feature.title}
                            </h1>
                            <p>{feature.content}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="products-bg">
                <div className="container mx-auto py-20">
                    <h2 className="text-[20px] md:text-[30px] text-center font-medium mb-4 text-green">
                        Related Products
                    </h2>
                    <style>
                        {`
              .slick-prev:before,
              .slick-next:before {
                color: white;
                font-size:25px;
              }
            `}
                    </style>
                    <Slider {...settings}>
                        <div className="carousel-item mx-auto">
                            <div className="text-center p-5 flex justify-center">
                                <Image
                                    width={500}
                                    height={100}
                                    src="/assets/images/ProductBattery.png"
                                    alt="product image"
                                ></Image>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="text-center p-5 flex justify-center">
                                <Image
                                    width={500}
                                    height={100}
                                    src="/assets/images/ProductBattery.png"
                                    alt="product image"
                                ></Image>
                            </div>
                        </div>
                    </Slider>
                </div>
            </section>

            <section className="bg-[#00a241] py-20 signup-newsletter-bg shadow-inner">
                <div className="container mx-auto">
                    <h2 className="text-center text-white text-2xl lg:text-5xl font-semibold">
                        Subscribe Newsletter
                    </h2>
                    <div className="flex justify-center items-center gap-2">
                        <div className="w-[50px] md:w-[100px] h-[1px] bg-[#ffffff8a]"></div>
                        <h2 className="text-xl md:text-2xl text-[#ffffff8a]">
                            Get the latest news & offers
                        </h2>
                        <div className="w-[50px] md:w-[100px] h-[1px] bg-[#ffffff8a]"></div>
                    </div>

                    <div className="mx-auto py-10">
                        <form
                            action=""
                            className="mx-auto flex flex-col md:flex-row justify-center items-center gap-3 md:gap-0"
                        >
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="p-5 services-light-bg md:rounded-l-full text-black outline-none placeholder:text-black placeholder:font-semibold px-20 shadow-xl"
                                required
                            />
                            <button
                                type="submit"
                                className="p-5 text-white md:rounded-r-full bg-dark shadow-xl"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-white">
                        True environmental protection lies in loving the mountains, the
                        oceans, and in cherishing all creation.
                    </p>
                </div>
            </section>
        </>
    );
};

export default Page;
