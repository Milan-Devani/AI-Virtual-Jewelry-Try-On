"use client";

import * as React from "react";
import { Header } from "../components/layout/Header";
import { Hero } from "../components/layout/Hero";
import { ImageUploader } from "../components/upload/ImageUploader";
import { CategorySelector } from "../components/ai-tryon/CategorySelector";
import { GenerationSettings } from "../components/ai-tryon/GenerationSettings";
import { LiveProgress } from "../components/ai-tryon/LiveProgress";
import { ResultSection } from "../components/result/ResultSection";
import { HistoryModal } from "../components/result/HistoryModal";
import { SettingsModal } from "../components/layout/SettingsModal";
import { Modal } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  ImageFileState,
  BackgroundType,
  AspectRatio,
  ImageSizeQuality,
  TryOnGenerationResult,
} from "../types";
import { generateTryOnApi, ApiErrorWithDetails } from "../services/api";
import { JEWELRY_CATEGORIES } from "../constants/categories";
import { Sparkles, AlertTriangle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Smart helper to extract suggested categories from details or message
function extractSuggestedCategories(
  detailsCategory?: string,
  message?: string
): string[] {
  const list: string[] = [];
  if (detailsCategory && JEWELRY_CATEGORIES.some((c) => c.id === detailsCategory)) {
    list.push(detailsCategory);
  }

  if (message) {
    const lower = message.toLowerCase();
    for (const cat of JEWELRY_CATEGORIES) {
      if (
        (lower.includes(`'${cat.id}'`) ||
          lower.includes(`"${cat.id}"`) ||
          lower.includes(cat.name.toLowerCase())) &&
        !list.includes(cat.id)
      ) {
        list.push(cat.id);
      }
    }
  }

  return list;
}

export default function TryOnWorkspacePage() {
  // Modal States
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  // Category Mismatch Modal Popup State
  const [mismatchModalData, setMismatchModalData] = React.useState<{
    isOpen: boolean;
    message: string;
    suggestedCategories: string[];
  }>({
    isOpen: false,
    message: "",
    suggestedCategories: [],
  });

  // Model & Jewelry Upload States
  const [modelState, setModelState] = React.useState<ImageFileState>({
    file: null,
    previewUrl: null,
    name: "",
    sizeBytes: 0,
    isValid: false,
  });

  const [jewelryState, setJewelryState] = React.useState<ImageFileState>({
    file: null,
    previewUrl: null,
    name: "",
    sizeBytes: 0,
    isValid: false,
  });

  // Settings
  const [selectedCategory, setSelectedCategory] = React.useState<string>("earrings");
  const [customCategoryName, setCustomCategoryName] = React.useState<string>("Nath / Nose Ring");
  const [customPlacement, setCustomPlacement] = React.useState<string>("nose & nostril");

  const [background, setBackground] = React.useState<BackgroundType>("studio");
  const [aspectRatio, setAspectRatio] = React.useState<AspectRatio>("4:5");
  const [imageSize, setImageSize] = React.useState<ImageSizeQuality>("2K");

  // Generation status
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generationError, setGenerationError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<TryOnGenerationResult | null>(null);

  // Scroll to result on success
  const resultRef = React.useRef<HTMLDivElement>(null);

  const canGenerate =
    modelState.isValid &&
    modelState.file &&
    jewelryState.isValid &&
    jewelryState.file &&
    !isGenerating;

  const handleGenerate = async () => {
    if (!modelState.file || !jewelryState.file) {
      toast.error("Please upload both a model image and a jewelry image.");
      return;
    }

    if (selectedCategory === "custom" && !customCategoryName.trim()) {
      toast.error("Please enter a custom jewelry category name.");
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await generateTryOnApi({
        modelFile: modelState.file,
        jewelryFile: jewelryState.file,
        category: selectedCategory,
        customCategoryName: selectedCategory === "custom" ? customCategoryName : undefined,
        customPlacement: selectedCategory === "custom" ? customPlacement : undefined,
        background,
        aspectRatio,
        imageSize,
      });

      setResult(response);
      toast.success("AI virtual try-on generated successfully!");

      // Smooth scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err: unknown) {
      const apiErr = err as ApiErrorWithDetails;
      const errorMsg =
        apiErr?.message ||
        "We couldn't generate the try-on image this time. Your uploaded files are preserved.";

      setGenerationError(errorMsg);

      // If category or anatomical mismatch occurred, show modal popup
      if (
        apiErr?.code === "INVALID_CATEGORY" ||
        errorMsg.toLowerCase().includes("category") ||
        errorMsg.toLowerCase().includes("mismatch") ||
        errorMsg.toLowerCase().includes("body")
      ) {
        const suggested = extractSuggestedCategories(
          apiErr?.details?.suggestedCategory,
          errorMsg
        ).filter((catId) => catId !== selectedCategory);

        setMismatchModalData({
          isOpen: true,
          message: errorMsg,
          suggestedCategories: suggested,
        });
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleSwitchCategory = (newCatId: string) => {
    setSelectedCategory(newCatId);
    setMismatchModalData({ isOpen: false, message: "", suggestedCategories: [] });
    setGenerationError(null);
    const catName = JEWELRY_CATEGORIES.find((c) => c.id === newCatId)?.name || newCatId;
    toast.success(`Category updated to '${catName}'`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5]">
      {/* Navigation Header */}
      <Header
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Editorial Hero */}
        <Hero />

        {/* Main Workspace Card */}
        <Card className="w-full bg-white border border-[#E8E1D6] rounded-3xl shadow-card overflow-visible">
          <CardContent className="p-6 sm:p-8 space-y-6 overflow-visible">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE3]">
              <div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1A1715]">
                  AI Try-On Studio Workspace
                </h2>
                <p className="text-xs text-[#7A736B] mt-0.5">
                  Step 1: Upload model &amp; jewelry • Step 2: Choose placement &amp; render
                </p>
              </div>
            </div>

            {/* Dual Upload Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ImageUploader
                id="model-image-input"
                label="1. Human Model Reference"
                subtitle="Model identity, skin tone, & pose reference"
                state={modelState}
                onChange={setModelState}
              />

              <ImageUploader
                id="jewelry-image-input"
                label="2. Exact Jewelry Product"
                subtitle="High-fidelity product photo to place on model"
                state={jewelryState}
                onChange={setJewelryState}
              />
            </div>

            {/* Category Selector with Custom Category Support */}
            <div className="pt-2 border-t border-[#F0EBE3]">
              <CategorySelector
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                customCategoryName={customCategoryName}
                onChangeCustomCategoryName={setCustomCategoryName}
                customPlacement={customPlacement}
                onChangeCustomPlacement={setCustomPlacement}
                disabled={isGenerating}
              />
            </div>

            {/* Environment & Output Settings */}
            <div className="pt-2 border-t border-[#F0EBE3]">
              <GenerationSettings
                background={background}
                onChangeBackground={setBackground}
                aspectRatio={aspectRatio}
                onChangeAspectRatio={setAspectRatio}
                imageSize={imageSize}
                onChangeImageSize={setImageSize}
                disabled={isGenerating}
              />
            </div>

            {/* Generation Progress Display */}
            {isGenerating && (
              <div className="pt-2">
                <LiveProgress />
              </div>
            )}

            {/* Error Display Card */}
            {generationError && !isGenerating && (
              <div className="p-4 rounded-2xl bg-[#FFF6F6] border border-[#F6D2D2] flex items-start gap-3 text-xs text-[#C93B3B] animate-in fade-in">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#C93B3B]" />
                <div className="flex-1">
                  <p className="font-semibold">Category or Anatomical Mismatch</p>
                  <p className="mt-0.5 text-[#A53030] leading-relaxed">{generationError}</p>
                  <p className="mt-1.5 text-[11px] text-[#7A736B]">
                    Please select the matching category for your uploaded images or upload an image showing the required body area.
                  </p>
                </div>
              </div>
            )}

            {/* Generate Action Button */}
            <div className="pt-4 border-t border-[#F0EBE3] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#7A736B]">
                {!modelState.isValid && !jewelryState.isValid ? (
                  <span>Upload both references to enable generation</span>
                ) : !modelState.isValid ? (
                  <span>Upload a valid human model image</span>
                ) : !jewelryState.isValid ? (
                  <span>Upload a valid jewelry product image</span>
                ) : (
                  <span className="text-[#1E7748] font-medium">
                    ✓ Both references validated &amp; ready
                  </span>
                )}
              </div>

              <Button
                variant="primary"
                size="lg"
                disabled={!canGenerate}
                isLoading={isGenerating}
                onClick={handleGenerate}
                className="w-full sm:w-auto px-8 h-12 bg-gradient-to-r from-[#1A1816] to-[#2B2621] text-white shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4 mr-2 text-[#D8B77E]" />
                <span>Generate Virtual Try-On</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div ref={resultRef}>
          {result && (
            <ResultSection
              result={result}
              onRegenerate={handleRegenerate}
              isRegenerating={isGenerating}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#EBE5DC] bg-white/70 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A736B]">
          <p>© {new Date().getFullYear()} JEWELAI. Production AI Jewelry Virtual Try-On Platform.</p>
          <div className="flex items-center gap-4 text-[#7A736B]">
            <span>Model Identity Lock</span>
            <span>•</span>
            <span>Gemini Neural Synthesis</span>
            <span>•</span>
            <span>Commercial E-commerce Export</span>
          </div>
        </div>
      </footer>

      {/* Category / Anatomical Mismatch Modal Popup */}
      <Modal
        isOpen={mismatchModalData.isOpen}
        onClose={() => setMismatchModalData({ isOpen: false, message: "", suggestedCategories: [] })}
        title="Category Selection Mismatch"
        description="Our AI Vision Analysis detected an anatomical placement conflict"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FFF8F2] border border-[#F2D7BD] flex items-start gap-3 text-[#8A4A1C]">
            <AlertTriangle className="w-5 h-5 shrink-0 text-[#C96826] mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-sm text-[#1A1715]">Anatomical Conflict Detected</p>
              <p className="text-[#6D401C] leading-relaxed">{mismatchModalData.message}</p>
            </div>
          </div>

          <p className="text-[#7A736B] leading-relaxed">
            To generate a realistic virtual try-on, the visible body region in your model photo must match the jewelry item and selected category.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-end gap-2.5">
            {mismatchModalData.suggestedCategories.map((catId) => {
              const catName = JEWELRY_CATEGORIES.find((c) => c.id === catId)?.name || catId;
              return (
                <Button
                  key={catId}
                  variant="gold"
                  size="sm"
                  onClick={() => handleSwitchCategory(catId)}
                  className="flex items-center gap-1.5"
                >
                  <span>Switch to {catName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setMismatchModalData({ isOpen: false, message: "", suggestedCategories: [] })}
            >
              Choose Manually
            </Button>
          </div>
        </div>
      </Modal>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
