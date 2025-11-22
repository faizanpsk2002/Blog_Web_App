"use client";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import icon_1 from "@/assets/img/icon/contact_icon01.svg";
import icon_2 from "@/assets/img/icon/contact_icon02.svg";
import icon_3 from "@/assets/img/icon/contact_icon03.svg";
import ContactFormArea from "./ContactFormArea";

interface DataType {
  id: number;
  icon: StaticImageData;
  title: string;
  addres: JSX.Element;
}

const ContactArea = () => {
  const [contactData, setContactData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/general-settings`,
          { headers: { accept: "application/json" } }
        );
        const json = await res.json();

        if (json.status && json.data) {
          const data = json.data;

          const mappedData: DataType[] = [
            {
              id: 1,
              icon: icon_1,
              title: "Location",
              addres: <>{data.office_address}</>,
            },
            {
              id: 2,
              icon: icon_2,
              title: "E-mail",
              addres: <>{data.email}</>,
            },
            {
              id: 3,
              icon: icon_3,
              title: "Phone",
              addres: (
                <>
                  +{data.whatsapp_contact}, +{data.calling_contact}
                </>
              ),
            },
          ];

          setContactData(mappedData);
        }
      } catch (error) {
        console.error("Error fetching general settings:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <section className="contact-area pt-80 pb-50">
      <div className="container">
        <div className="contact-info-wrap">
          <div className="row justify-content-center">
            {contactData.map((item) => (
              <div key={item.id} className="col-xl-4 col-lg-6">
                <div className="contact-info-item">
                  <div className="icon">
                    <Image src={item.icon} alt="" />
                  </div>
                  <div className="content">
                    <h5 className="title">{item.title}</h5>
                    <p>{item.addres}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ContactFormArea />
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
