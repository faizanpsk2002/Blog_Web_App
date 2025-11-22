"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AdBannerThree = () => {
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner-images`);
        const data = await res.json();
        if (data?.status) {
          setBanner(data.data.recent_posts_banner); // ✅ Pick only recent posts banner
        }
      } catch (error) {
        console.error("Error fetching recent post banner:", error);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) return null; // loader or nothing until data arrives

  return (
    <div className="ad-banner-img ad-banner-img-two text-center mb-4">
      <Link href="#">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${banner}`}
          alt="Recent Posts Banner"
          width={1000}
          height={200}
          priority
        />
      </Link>
    </div>
  );
};

export default AdBannerThree;
