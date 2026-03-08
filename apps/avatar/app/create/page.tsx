"use client";

import Link from "next/link";
import { useState } from "react";

export default function CreateAvatar() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [step, setStep] = useState<"upload" | "profile" | "generating" | "complete">("upload");
  const [profile, setProfile] = useState({
    gender: "",
    age: "",
    bodyType: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setStep("profile");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("generating");

    // 시뮬레이션: 3초 후 완료
    setTimeout(() => {
      setStep("complete");
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-[var(--color-beige)] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-semibold text-[var(--color-ink)]">
              Avatar
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-[var(--color-ink)]">아바타 생성</h1>
          <p className="mt-2 text-base font-light text-[var(--color-ink-light)]">
            {step === "upload" && "얼굴 사진을 업로드해주세요"}
            {step === "profile" && "프로필 정보를 입력해주세요"}
            {step === "generating" && "아바타를 생성하고 있습니다"}
            {step === "complete" && "아바타가 생성되었습니다"}
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 transition ${step === "upload" ? "text-[var(--color-olive)]" : "text-[var(--color-warm-gray)]"}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${step === "upload" ? "border-[var(--color-olive)] bg-[var(--color-ivory)]" : "border-[var(--color-beige)]"}`}>
                <span className="text-sm font-normal">1</span>
              </div>
              <span className="hidden sm:inline text-sm font-normal">사진 업로드</span>
            </div>
            <div className="h-px w-8 sm:w-12 bg-[var(--color-beige)]" />
            <div className={`flex items-center gap-2 transition ${step === "profile" || step === "generating" || step === "complete" ? "text-[var(--color-olive)]" : "text-[var(--color-warm-gray)]"}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${step === "profile" || step === "generating" || step === "complete" ? "border-[var(--color-olive)] bg-[var(--color-ivory)]" : "border-[var(--color-beige)]"}`}>
                <span className="text-sm font-normal">2</span>
              </div>
              <span className="hidden sm:inline text-sm font-normal">프로필 입력</span>
            </div>
            <div className="h-px w-8 sm:w-12 bg-[var(--color-beige)]" />
            <div className={`flex items-center gap-2 transition ${step === "complete" ? "text-[var(--color-olive)]" : "text-[var(--color-warm-gray)]"}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${step === "complete" ? "border-[var(--color-olive)] bg-[var(--color-ivory)]" : "border-[var(--color-beige)]"}`}>
                <span className="text-sm font-normal">3</span>
              </div>
              <span className="hidden sm:inline text-sm font-normal">완료</span>
            </div>
          </div>
        </div>

        {/* Upload Step */}
        {step === "upload" && (
          <div className="rounded-xl bg-white p-8 border border-[var(--color-beige)]">
            <label
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[var(--color-beige)] rounded-lg cursor-pointer hover:border-[var(--color-olive)] hover:bg-[var(--color-ivory)] transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-12 h-12 mb-4 text-[var(--color-warm-gray)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm font-normal text-[var(--color-ink)]">
                  클릭해서 사진 업로드
                </p>
                <p className="text-xs font-light text-[var(--color-warm-gray)]">PNG, JPG (최대 10MB)</p>
              </div>
              <input
                id="photo-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            <div className="mt-6 rounded-lg border border-[var(--color-beige)] bg-[var(--color-ivory)] p-4">
              <h4 className="text-sm font-medium text-[var(--color-ink)] mb-2">
                좋은 사진 가이드
              </h4>
              <ul className="text-sm font-light text-[var(--color-ink-light)] space-y-1">
                <li>• 얼굴이 정면으로 잘 보이는 사진</li>
                <li>• 밝은 조명에서 촬영한 사진</li>
                <li>• 선글라스나 마스크를 쓰지 않은 사진</li>
              </ul>
            </div>
          </div>
        )}

        {/* Profile Step */}
        {step === "profile" && (
          <div className="rounded-xl bg-white p-8 border border-[var(--color-beige)]">
            {uploadedImage && (
              <div className="mb-6 flex justify-center">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="h-32 w-32 rounded-full object-cover border-4 border-[var(--color-beige)]"
                />
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">
                  성별
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setProfile({ ...profile, gender: "male" })}
                    className={`py-3 px-4 rounded-lg border transition ${
                      profile.gender === "male"
                        ? "border-[var(--color-olive)] bg-[var(--color-ivory)] text-[var(--color-ink)]"
                        : "border-[var(--color-beige)] hover:border-[var(--color-warm-gray)] text-[var(--color-ink)]"
                    }`}
                  >
                    <span className="font-normal">남성</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfile({ ...profile, gender: "female" })}
                    className={`py-3 px-4 rounded-lg border transition ${
                      profile.gender === "female"
                        ? "border-[var(--color-olive)] bg-[var(--color-ivory)] text-[var(--color-ink)]"
                        : "border-[var(--color-beige)] hover:border-[var(--color-warm-gray)] text-[var(--color-ink)]"
                    }`}
                  >
                    <span className="font-normal">여성</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">
                  연령대
                </label>
                <select
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-beige)] bg-white px-4 py-3 font-normal text-[var(--color-ink)] focus:border-[var(--color-olive)] focus:outline-none transition"
                >
                  <option value="">선택해주세요</option>
                  <option value="20s">20대</option>
                  <option value="30s">30대</option>
                  <option value="40s">40대</option>
                  <option value="50s">50대 이상</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">
                  체형
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {["슬림", "보통", "건장"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProfile({ ...profile, bodyType: type })}
                      className={`py-3 px-4 rounded-lg border transition ${
                        profile.bodyType === type
                          ? "border-[var(--color-olive)] bg-[var(--color-ivory)] text-[var(--color-ink)]"
                          : "border-[var(--color-beige)] hover:border-[var(--color-warm-gray)] text-[var(--color-ink)]"
                      }`}
                    >
                      <span className="font-normal">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!profile.gender || !profile.age || !profile.bodyType}
                className="w-full rounded-lg bg-[var(--color-ink)] px-6 py-3 text-base font-normal text-white hover:bg-[var(--color-olive)] disabled:bg-[var(--color-warm-gray)] disabled:cursor-not-allowed transition"
              >
                아바타 생성하기
              </button>
            </form>
          </div>
        )}

        {/* Generating Step */}
        {step === "generating" && (
          <div className="rounded-xl bg-white p-12 border border-[var(--color-beige)] text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-3 w-3 rounded-full bg-[var(--color-olive)] animate-pulse" />
            </div>
            <h3 className="text-xl font-medium text-[var(--color-ink)] mb-2">
              아바타를 생성하고 있습니다
            </h3>
            <p className="text-base font-light text-[var(--color-ink-light)]">잠시만 기다려주세요</p>
          </div>
        )}

        {/* Complete Step */}
        {step === "complete" && (
          <div className="rounded-xl bg-white p-8 border border-[var(--color-beige)] text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-48 w-48 rounded-lg border-2 border-[var(--color-beige)] bg-[var(--color-ivory)] flex items-center justify-center">
                <span className="text-6xl">👤</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-[var(--color-ink)] mb-2">
              아바타 생성 완료
            </h3>
            <p className="text-base font-light text-[var(--color-ink-light)] mb-8">
              이제 다양한 상품을 가상으로 착용해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="rounded-lg bg-[var(--color-ink)] px-6 py-3 text-base font-normal text-white hover:bg-[var(--color-olive)] transition">
                가상 피팅 시작
              </button>
              <Link
                href="/"
                className="rounded-lg border border-[var(--color-beige)] px-6 py-3 text-base font-normal text-[var(--color-ink)] hover:bg-[var(--color-beige)] transition"
              >
                홈으로
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
