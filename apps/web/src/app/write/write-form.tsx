'use client';

import { useState, useRef } from 'react';

const MAX_LENGTH = 300;
const KEYWORDS = ['산책', '요리', '독서', '비움', '차', '텃밭', '그림', '필사', '날씨'];

export function WriteForm() {
  const [content, setContent] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const remaining = MAX_LENGTH - content.length;
  const canSubmit = content.trim().length > 0 && selectedKeyword;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <>
      {/* 텍스트 입력 */}
      <div className="mb-2">
        <textarea
          value={content}
          onChange={(e) =>
            setContent(e.target.value.slice(0, MAX_LENGTH))
          }
          placeholder="무엇이 소소한 행복이었나요?"
          rows={6}
          className="w-full resize-none rounded-none border-b border-[var(--color-beige)] bg-transparent py-4 text-[15px] leading-8 text-[var(--color-ink)] placeholder:text-[var(--color-warm-gray)] focus:border-[var(--color-olive)] focus:outline-none"
        />
        <div className="flex justify-end">
          <span
            className={`text-xs ${
              remaining < 30
                ? 'text-[#B5705A]'
                : 'text-[var(--color-warm-gray)]'
            }`}
          >
            {remaining}자 남음
          </span>
        </div>
      </div>

      {/* 사진 첨부 */}
      <div className="mb-8">
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="첨부 사진"
              className="h-48 w-full rounded-lg object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-ink)]/60 text-xs text-white"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--color-beige)] py-8 text-sm text-[var(--color-warm-gray)] transition-colors hover:border-[var(--color-warm-gray)]"
          >
            <CameraIcon />
            사진 한 장 (선택)
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* 키워드 선택 */}
      <div className="mb-10">
        <p className="mb-3 text-xs text-[var(--color-warm-gray)]">
          어떤 소소함인가요?
        </p>
        <div className="flex flex-wrap gap-2">
          {KEYWORDS.map((keyword) => (
            <button
              key={keyword}
              onClick={() => setSelectedKeyword(keyword)}
              className={`rounded-full px-4 py-1.5 text-xs tracking-wider transition-all duration-300 ${
                selectedKeyword === keyword
                  ? 'bg-[var(--color-ink)] text-[var(--color-ivory)]'
                  : 'border border-[var(--color-beige)] text-[var(--color-warm-gray)] hover:border-[var(--color-warm-gray)]'
              }`}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>

      {/* 제출 */}
      <button
        disabled={!canSubmit}
        className={`w-full rounded-full py-3.5 text-sm tracking-wider transition-all duration-500 ${
          canSubmit
            ? 'bg-[var(--color-ink)] text-[var(--color-ivory)] hover:bg-[var(--color-olive)]'
            : 'bg-[var(--color-beige)] text-[var(--color-warm-gray)] cursor-not-allowed'
        }`}
      >
        소소함 남기기
      </button>
    </>
  );
}

function CameraIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
