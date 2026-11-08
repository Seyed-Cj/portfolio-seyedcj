"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SECTIONS } from "@/components/context/section-context";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";
const HIDE_SCROLL_DELTA = 10;
const SHOW_SCROLL_DELTA = -6;
const JITTER_THRESHOLD = 3;
const TOP_THRESHOLD = 10;
const BOTTOM_THRESHOLD = 24;
const IDLE_DELAY_MS = 700;

export function useNavVisibility(activeSectionIndex: number) {
  // Always start visible on both server and initial client render to avoid hydration mismatch
  const [isVisible, setIsVisible] = useState(true);
  const isMobileRef = useRef(false);
  const lastScrollTopRef = useRef(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (idleTimerRef.current !== null) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const showNav = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_MEDIA_QUERY);
    let cleanupScroll: (() => void) | null = null;

    const getScrollContainer = (): HTMLElement | null => {
      const sectionId = SECTIONS[activeSectionIndex];
      if (!sectionId) return null;
      const sectionEl = document.getElementById(sectionId);
      if (!sectionEl) return null;
      return sectionEl.querySelector<HTMLElement>(".overflow-y-auto") ?? sectionEl;
    };

    const attachScrollListener = () => {
      if (cleanupScroll) {
        cleanupScroll();
        cleanupScroll = null;
      }
      clearTimers();

      if (!mql.matches) {
        isMobileRef.current = false;
        setIsVisible(true);
        return;
      }

      isMobileRef.current = true;
      setIsVisible(true);

      const scrollEl = getScrollContainer();
      if (!scrollEl) return;

      lastScrollTopRef.current = Math.max(0, scrollEl.scrollTop);

      const evaluateScroll = () => {
        rafIdRef.current = null;

        const { scrollTop, clientHeight, scrollHeight } = scrollEl;
        const maxScroll = scrollHeight - clientHeight;

        // Non-scrollable section: always keep navbar visible
        if (maxScroll <= 2) {
          setIsVisible(true);
          lastScrollTopRef.current = 0;
          return;
        }

        // Ignore iOS rubber-band overscroll outside [0, maxScroll]
        if (scrollTop < 0) {
          setIsVisible(true);
          lastScrollTopRef.current = 0;
          return;
        }
        if (scrollTop > maxScroll) {
          setIsVisible(true);
          lastScrollTopRef.current = maxScroll;
          return;
        }

        // Near top or bottom edge: always show navbar
        if (
          scrollTop <= TOP_THRESHOLD ||
          scrollTop + clientHeight >= scrollHeight - BOTTOM_THRESHOLD
        ) {
          setIsVisible(true);
          lastScrollTopRef.current = scrollTop;
          return;
        }

        const delta = scrollTop - lastScrollTopRef.current;

        // Ignore tiny scroll jitter
        if (Math.abs(delta) <= JITTER_THRESHOLD) {
          return;
        }

        if (delta >= HIDE_SCROLL_DELTA) {
          setIsVisible(false);
          lastScrollTopRef.current = scrollTop;
        } else if (delta <= SHOW_SCROLL_DELTA) {
          setIsVisible(true);
          lastScrollTopRef.current = scrollTop;
        }
      };

      const handleScroll = () => {
        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(evaluateScroll);
        }

        if (idleTimerRef.current !== null) {
          clearTimeout(idleTimerRef.current);
        }
        idleTimerRef.current = setTimeout(() => {
          setIsVisible(true);
          const maxScroll = Math.max(0, scrollEl.scrollHeight - scrollEl.clientHeight);
          lastScrollTopRef.current = Math.max(0, Math.min(scrollEl.scrollTop, maxScroll));
        }, IDLE_DELAY_MS);
      };

      scrollEl.addEventListener("scroll", handleScroll, { passive: true });
      cleanupScroll = () => {
        scrollEl.removeEventListener("scroll", handleScroll);
      };
    };

    attachScrollListener();

    const handleMediaChange = () => {
      attachScrollListener();
    };

    mql.addEventListener("change", handleMediaChange);

    return () => {
      mql.removeEventListener("change", handleMediaChange);
      if (cleanupScroll) {
        cleanupScroll();
      }
      clearTimers();
    };
  }, [activeSectionIndex, clearTimers]);

  return { isVisible, showNav };
}
