"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AdBannerTwo = () => {
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner-images`);
        const data = await res.json();
        if (data?.status) {
          setBanner(data.data.trending_news_banner); // ✅ pick trending_news_banner
        }
      } catch (error) {
        console.error("Error fetching trending news banner:", error);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) return null;

  return (
    <div className="ad-banner-img ad-banner-img-two text-center">
      <Link href="#">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${banner}`}
          alt="Trending News Banner"
          width={1000}
          height={200}
          priority
        />
      </Link>
    </div>
  );
};

export default AdBannerTwo;
