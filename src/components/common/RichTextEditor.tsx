// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import React, { useRef, useEffect, useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  RotateCcw,
  RotateCw,
  RemoveFormatting,
  Eye,
} from 'lucide-react';

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  value,
  onChange,
  className = '',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const exec = (command: string, arg: string | undefined = undefined) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Tautan URL:');
    if (url) exec('createLink', url);
  };

  const insertImage = () => {
    const url = prompt('URL Gambar:');
    if (url) exec('insertImage', url);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-[#1b2433]">{label}</label>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 transition ${
            isPreview
              ? 'bg-[#0b1c38] text-white border-[#0b1c38]'
              : 'border-[#e7e1d5] text-[#4b5565] hover:bg-[#f8f5ef]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isPreview ? 'Edit' : 'Pratinjau'}</span>
        </button>
      </div>

      {/* Toolbar */}
      {!isPreview && (
        <div className="flex flex-wrap items-center gap-1 p-1.5 rounded-xl border border-[#e7e1d5] bg-[#f8f5ef]">
          {/* History */}
          <button
            type="button"
            onClick={() => exec('undo')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Undo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('redo')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Redo"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <span className="w-[1px] h-4 bg-[#e7e1d5] mx-1" />

          {/* Headings */}
          <button
            type="button"
            onClick={() => exec('formatBlock', '<h1>')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="H1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<h2>')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="H2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<h3>')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="H3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <span className="w-[1px] h-4 bg-[#e7e1d5] mx-1" />

          {/* Formats */}
          <button
            type="button"
            onClick={() => exec('bold')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Tebal"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('italic')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Miring"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('underline')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Garis Bawah"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('strikeThrough')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Coret"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <span className="w-[1px] h-4 bg-[#e7e1d5] mx-1" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => exec('justifyLeft')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Rata Kiri"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('justifyCenter')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Rata Tengah"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('justifyRight')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Rata Kanan"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('justifyFull')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Rata Kanan Kiri"
          >
            <AlignJustify className="w-4 h-4" />
          </button>
          <span className="w-[1px] h-4 bg-[#e7e1d5] mx-1" />

          {/* Lists & Quotes */}
          <button
            type="button"
            onClick={() => exec('insertUnorderedList')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Daftar Butir"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('insertOrderedList')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Daftar Nomor"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<blockquote>')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Kutipan"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<pre>')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Kode"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('insertHorizontalRule')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Garis Pemisah"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-[1px] h-4 bg-[#e7e1d5] mx-1" />

          {/* Inserts & Cleanup */}
          <button
            type="button"
            onClick={insertLink}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Tautan"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={insertImage}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Sisip Gambar"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('removeFormat')}
            className="p-1.5 hover:bg-white rounded text-[#4b5565] transition"
            aria-label="Bersihkan Format"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Editor Content Area (auto-growing, no internal scrollbar) */}
      {isPreview ? (
        <div
          className="min-h-[140px] p-4 rounded-xl border border-[#e7e1d5] bg-[#f8f5ef] prose prose-slate max-w-none text-base"
          dangerouslySetInnerHTML={{ __html: value || '' }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="min-h-[140px] p-4 rounded-xl border border-[#e7e1d5] bg-white text-base text-[#1b2433] focus:border-[#c9a35a] focus:outline-none transition prose prose-slate max-w-none"
        />
      )}
    </div>
  );
};
