"use client";

import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function AppControls() {
  return (
    <div className="fixed top-4 z-50 flex items-center gap-2 md:top-auto md:right-6 md:bottom-6 md:left-auto ltr:right-4 ltr:left-auto rtl:right-auto rtl:left-4">
      <ThemeToggle />
      <LanguageSwitcher />
    </div>
  );
}
