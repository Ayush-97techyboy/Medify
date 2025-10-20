import React from 'react';
import { Box, Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Off1 from '../../assets/Offers/Off1.png';
import Off2 from '../../assets/Offers/Off2.png';
import Off3 from '../../assets/Offers/Off3.png';

const banners = [
  {
    image: Off1,
    alt: 'Offer 1',
  },
  {
    image: Off2,
    alt: 'Offer 2',
  },
  {
    image: Off3,
    alt: 'Offer 3',
  },
];

const PromoBanners = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#fff' }}>
      <Container maxWidth="lg">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          autoplay={{ delay: 3000}}
          pagination={{ clickable: true }}
          loop
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <img
                src={banner.image}
                alt={banner.alt}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 12 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default PromoBanners;
