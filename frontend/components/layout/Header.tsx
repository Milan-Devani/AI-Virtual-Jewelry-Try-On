import * as React from "react";
import { Sparkles, History, Settings } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  onOpenHistory: () => void;
  onOpenSettings: () => void;
}

export function Header({ onOpenHistory, onOpenSettings }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#EBE5DC]/80 bg-[#FBF9F5]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A2622] to-[#121110] flex items-center justify-center text-[#D8B77E] shadow-sm border border-[#3E3832]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl tracking-wider font-bold text-[#1A1715]">
                JEWELAI
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-[#F4EFE7] text-[#8C6428] border border-[#E8DFC9]">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-[#7A736B] tracking-tight hidden sm:block">
              AI Virtual Jewelry Try-On
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenHistory}
            className="flex items-center gap-2 border-[#E2DBD1] hover:bg-[#F4EFE7]"
          >
            <History className="w-4 h-4 text-[#7A736B]" />
            <span className="hidden sm:inline">History</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenSettings}
            className="p-2.5 sm:px-3.5 flex items-center gap-2 text-[#6B645D]"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
