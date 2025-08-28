"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";

export function TopLoader() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // mulai progress bar
    NProgress.start();

    // sedikit delay supaya ada efek
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // tidak render apa2, hanya kontrol NProgress
}
