"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AdBanner = () => {
  const [banners, setBanners] = useState<any>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner-images`);
        const data = await res.json();
        if (data?.status) {
          setBanners(data.data);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  if (!banners) {
    return null; // loader or skeleton can be added here
  }

  return (
    <div className="ad-banner-area">
      <div className="container">
        <div className="ad-banner-img ad-banner-img-two text-center">
          <Link href="#">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${banners.editors_choice_banner}`}
              alt="Editors Choice Banner"
              width={1000}
              height={200}
              priority
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
