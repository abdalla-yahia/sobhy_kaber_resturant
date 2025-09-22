import gsap from "gsap";
import {useGSAP} from '@gsap/react'
import {useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);
export default function Content_Container_Hook() {
    
  const sections = useTranslations('homepage.sections')
  const container = useRef<HTMLDivElement>(null);
  // useGSAP hook
  useGSAP(
    () => {
      // Titles
      gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
        });
      });

      // Texts
      gsap.utils.toArray<HTMLElement>(".section-text").forEach((text) => {
        gsap.from(text, {
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: 100,
          opacity: 0,
          duration: 1,
        });
      });

      // Images
      gsap.utils.toArray<HTMLImageElement>(".section-image").forEach((image) => {
        gsap.from(image, {
          scrollTrigger: {
            trigger: image,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: -100,
          opacity: 0,
          duration: 1,
        });
      });
    },
    { scope: container }
  );
  return {container,sections}
}
