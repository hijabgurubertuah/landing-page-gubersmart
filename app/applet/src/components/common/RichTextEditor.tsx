/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import React, { useRef } from 'react';
import { Bold, Italic, Underline, Heading1, Heading2, List, ListOrdered, Quote, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, label }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const insertTag = (tagStart: string, tagEnd: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = `${tagStart}${selected || 'Teks'}${tagEnd}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    onChange(newText);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold uppercase tracking-wider text-[#4b5565]">{label}</label>}
      <div className="border border-[#e7e1d5] rounded-[14px] overflow-hidden bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-[#f8f5ef] border-b border-[#e7e1d5]">
          <button
            type="button"
            onClick={() => insertTag('<h1>', '</h1>')}
            className="p-1.5 rounded hover:bg-[#f1ece2] text-[#4b5565]"
            title="Judul 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<h2>', '</h2>')}
            className="p-1.5 rounded hover:bg-[#f1ece2] text-[#4b5565]"
            title="Judul 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<strong>', '</strong>')}
            className="p-1.5 rounded hover:bg-[#f1ece2] text-[#4b5565]"
            title="Tebal"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<em>', '</em>')}
            className="p-1.5 rounded hover:bg-[#f1ece2] text-[#4b5565]"
            title="Miring"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<u>', '</u>')}
            className="p-1.5 rounded hover:bg-[#f1ece2] text-[#4b5565]"
            title="Garis Bawah"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')}
            className="p-1.5 rounded hover:bg-[#f1ece2] text-[#4b5565]"
            title="Daftar Berbutir"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<ol>\n  <li>', '</li>\n</ol>')}
            className="p-1.5 rounded hover:bg-[#f1ece2] text-[#4b5565]"
            title="Daftar Bernomor"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<blockquote>', '</blockquote>')}
            className="p-1.5 rounded hover:bg-[#f1ece2] text-[#4b5565]"
            title="Kutipan"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<a href="https://...">', '</a>')}
            className="p-1.5 rounded hover:bg-[#f1ece2] text-[#4b5565]"
            title="Tautan"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<img src="https://..." alt="" />')}
            className="p-1.5 rounded hover:bg-[#f1ece2] text-[#4b5565]"
            title="Gambar"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          rows={6}
          className="w-full p-3 text-sm focus:outline-none resize-none bg-white text-[#1b2433]"
          placeholder="Tulis isi di sini..."
        />
      </div>
    </div>
  );
};
