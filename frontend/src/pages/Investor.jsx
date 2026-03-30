import React from 'react'

export default function Investor() {
    return (
        <div>

            <div className='relative'>

                <img src="/home_header.png" alt="" />

                <div className='absolute top-20 right-40 flex flex-col w-3/5 items-center text-center'>
                    <h2 className='bold text-2xl'>Meesho is democratising internet commerce for everyone</h2>

                    <p>For nearly a decade, Meesho has built innovative technology to create an accessible and affordable e-commerce ecosystem for a billion Indians</p>
                </div>

            </div>


            <div class="relative overflow-hidden">
                <div class="max-w-7xl w-full mx-auto py-12 px-4 sm:px-6 md:py-20 lg:py-32 md:px-8">
                    <div class="md:pe-8 md:w-1/2 xl:pe-0 xl:w-5/12">
                        <h1 class="text-xl text-foreground font-bold md:text-xl md:leading-tight lg:text-xl lg:leading-tight">
                            Making e-commerce affordable and accessible
                        </h1>
                        <p class="mt-3 text-base text-muted-foreground-1">
                            Meesho is a multi-sided technology platform driving e-commerce in India by connecting consumers, sellers, logistics partners, and content creators. Through a low-cost, discovery-led model, we enable affordable and accessible shopping for diverse consumer segments across the country.
                        </p>

                    </div>
                </div>

                <div class="hidden md:block md:absolute md:top-10 md:start-1/2 md:end-0 h-full "><img src="/relation_home_tile_1_main.png" alt="" /></div>

            </div>

            {/* two card */}
            <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div class="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div class="group flex flex-col h-full bg-card border border-card-line shadow-2xs rounded-xl">
                        <div class="h-full flex flex-col justify-center items-center  rounded-t-xl">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/hXyoN-pHU0U?si=uqrOOtAFCeAanVzs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>

                    <div class="group flex flex-col h-full bg-card border border-card-line shadow-2xs rounded-xl">
                        <div class="h-full flex flex-col justify-center items-center rounded-t-xl">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/f8Mij7eipdw?si=4Eb0RYq7sCxEn4yQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
