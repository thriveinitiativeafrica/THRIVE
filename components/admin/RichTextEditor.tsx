"use client";

import React, { useRef, useEffect, useState } from "react";
import { IconPlus } from "@/components/shared/Icons";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  onRequestInlineImage: () => void;
}

const ALLOWED_TAGS = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "img",
  "figure",
  "figcaption",
  "hr",
  "br",
]);

/**
 * Cleans HTML pasted from Google Docs, Microsoft Word, or web pages
 * into clean semantic HTML without ugly inline fonts/colors.
 */
function cleanPastedHtml(rawHtml: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, "text/html");

  function transformNode(node: Node): Node | DocumentFragment | null {
    if (node.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(node.textContent || "");
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    // Drop script, style, meta, link, svg, head
    if (["script", "style", "meta", "link", "head", "svg", "iframe", "object"].includes(tag)) {
      return null;
    }

    const styleAttr = (el.getAttribute("style") || "").toLowerCase();

    // Google Docs wraps the entire clipboard in <b style="font-weight:normal">!
    // Unwrap it so it doesn't make the entire pasted article bold.
    if (tag === "b" && styleAttr.includes("font-weight:normal")) {
      const frag = document.createDocumentFragment();
      el.childNodes.forEach((child) => {
        const cleaned = transformNode(child);
        if (cleaned) frag.appendChild(cleaned);
      });
      return frag;
    }

    // Process children first
    const childFrag = document.createDocumentFragment();
    el.childNodes.forEach((child) => {
      const cleaned = transformNode(child);
      if (cleaned) childFrag.appendChild(cleaned);
    });

    // Convert styled spans from Google Docs / Word into semantic tags
    if (tag === "span") {
      let current: Node = childFrag;
      const isBold =
        styleAttr.includes("font-weight:700") ||
        styleAttr.includes("font-weight: 700") ||
        styleAttr.includes("font-weight:bold") ||
        styleAttr.includes("font-weight: bold") ||
        styleAttr.includes("font-weight:800") ||
        styleAttr.includes("font-weight:900");
      const isItalic =
        styleAttr.includes("font-style:italic") || styleAttr.includes("font-style: italic");
      const isUnderline =
        styleAttr.includes("text-decoration:underline") ||
        styleAttr.includes("text-decoration: underline") ||
        styleAttr.includes("text-decoration-line:underline");

      if (isUnderline) {
        const u = document.createElement("u");
        u.appendChild(current);
        current = u;
      }
      if (isItalic) {
        const em = document.createElement("em");
        em.appendChild(current);
        current = em;
      }
      if (isBold) {
        const strong = document.createElement("strong");
        strong.appendChild(current);
        current = strong;
      }
      return current;
    }

    // Convert div to p if it's a block text container
    const targetTag = tag === "div" ? "p" : tag;

    if (!ALLOWED_TAGS.has(targetTag)) {
      return childFrag;
    }

    const cleanEl = document.createElement(targetTag);

    if (targetTag === "a") {
      const href = el.getAttribute("href") || "#";
      cleanEl.setAttribute("href", href);
      if (href.startsWith("http")) {
        cleanEl.setAttribute("target", "_blank");
        cleanEl.setAttribute("rel", "noopener noreferrer");
      }
    } else if (targetTag === "img") {
      const src = el.getAttribute("src") || "";
      if (!src) return null;
      cleanEl.setAttribute("src", src);
      cleanEl.setAttribute("alt", el.getAttribute("alt") || "");
    }

    cleanEl.appendChild(childFrag);
    return cleanEl;
  }

  const outputContainer = document.createElement("div");
  doc.body.childNodes.forEach((child) => {
    const transformed = transformNode(child);
    if (transformed) outputContainer.appendChild(transformed);
  });

  return outputContainer.innerHTML;
}

function plainTextToHtml(text: string): string {
  const paragraphs = text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return "";
  return paragraphs
    .map((p) => {
      const escaped = p
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br />");
      return `<p>${escaped}</p>`;
    })
    .join("");
}

export function RichTextEditor({
  value,
  onChange,
  onRequestInlineImage,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [sourceMode, setSourceMode] = useState(false);
  const lastExternalValue = useRef<string>(value);

  // Sync external value changes (e.g. when switching posts or inserting inline image)
  useEffect(() => {
    if (!editorRef.current || sourceMode) return;
    if (value !== lastExternalValue.current) {
      editorRef.current.innerHTML = value || "";
      lastExternalValue.current = value;
    }
  }, [value, sourceMode]);

  // Initialize editor HTML on mount or when leaving source mode
  useEffect(() => {
    if (!sourceMode && editorRef.current) {
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
        lastExternalValue.current = value || "";
      }
    }
  }, [sourceMode]);

  function syncFromDom() {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    lastExternalValue.current = html;
    onChange(html);
  }

  function exec(command: string, arg?: string) {
    if (sourceMode || !editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, arg);
    syncFromDom();
  }

  function handleFormatBlock(tag: string) {
    if (sourceMode || !editorRef.current) return;
    editorRef.current.focus();
    document.execCommand("formatBlock", false, `<${tag}>`);
    syncFromDom();
  }

  function handleAddLink() {
    if (sourceMode || !editorRef.current) return;
    const url = window.prompt("Enter link URL (e.g. https://...):", "https://");
    if (!url) return;
    editorRef.current.focus();
    document.execCommand("createLink", false, url);
    syncFromDom();
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const htmlData = e.clipboardData.getData("text/html");
    const textData = e.clipboardData.getData("text/plain");

    let toInsert = "";
    if (htmlData && htmlData.trim().length > 0) {
      toInsert = cleanPastedHtml(htmlData);
    } else if (textData) {
      toInsert = plainTextToHtml(textData);
    }

    if (toInsert) {
      document.execCommand("insertHTML", false, toInsert);
      syncFromDom();
    }
  }

  const plainWords = (value || "")
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const readMins = Math.max(1, Math.ceil(plainWords / 200));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden focus-within:border-[#2E1650] transition-colors">
      {/* Sticky Formatting Toolbar */}
      <div className="bg-[#FAF6EC] border-b border-gray-200 px-3 py-2.5 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1 flex-wrap">
          {/* Block styles */}
          <button
            type="button"
            onClick={() => handleFormatBlock("p")}
            disabled={sourceMode}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] text-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Normal paragraph"
          >
            Normal
          </button>
          <button
            type="button"
            onClick={() => handleFormatBlock("h1")}
            disabled={sourceMode}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] text-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Large Heading"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => handleFormatBlock("h2")}
            disabled={sourceMode}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] text-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Section Heading"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => handleFormatBlock("h3")}
            disabled={sourceMode}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] text-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Subheading"
          >
            H3
          </button>

          <span className="h-5 w-px bg-gray-300 mx-1" />

          {/* Inline styles */}
          <button
            type="button"
            onClick={() => exec("bold")}
            disabled={sourceMode}
            className="w-8 h-8 text-xs font-bold rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] text-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => exec("italic")}
            disabled={sourceMode}
            className="w-8 h-8 text-xs italic font-serif rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] text-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => exec("underline")}
            disabled={sourceMode}
            className="w-8 h-8 text-xs underline rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] text-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Underline (Ctrl+U)"
          >
            U
          </button>

          <span className="h-5 w-px bg-gray-300 mx-1" />

          {/* Lists & Quote */}
          <button
            type="button"
            onClick={() => exec("insertUnorderedList")}
            disabled={sourceMode}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] text-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => exec("insertOrderedList")}
            disabled={sourceMode}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] text-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Numbered List"
          >
            1. List
          </button>
          <button
            type="button"
            onClick={() => handleFormatBlock("blockquote")}
            disabled={sourceMode}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] text-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Quote Block"
          >
            “ Quote
          </button>
          <button
            type="button"
            onClick={handleAddLink}
            disabled={sourceMode}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] text-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Insert Link"
          >
            Link
          </button>
          <button
            type="button"
            onClick={() => exec("insertHorizontalRule")}
            disabled={sourceMode}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] text-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Insert Divider Line"
          >
            Divider
          </button>
          <button
            type="button"
            onClick={() => exec("removeFormat")}
            disabled={sourceMode}
            className="px-2.5 py-1.5 text-xs text-gray-600 rounded-lg bg-white border border-gray-200 hover:border-[#2E1650] transition-colors disabled:opacity-40 cursor-pointer"
            title="Clear formatting on selected text"
          >
            Clear Format
          </button>
        </div>

        {/* Right Actions: Insert Inline Image + Source Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRequestInlineImage}
            className="px-3 py-1.5 text-xs font-medium bg-[#2E1650] text-white rounded-lg hover:bg-[#381A5F] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <IconPlus className="w-3.5 h-3.5" />
            <span>Add Inline Image</span>
          </button>
          <button
            type="button"
            onClick={() => setSourceMode((prev) => !prev)}
            className={`px-2.5 py-1.5 text-[11px] font-medium rounded-lg border transition-colors cursor-pointer ${
              sourceMode
                ? "bg-[#2E1650] text-white border-[#2E1650]"
                : "bg-white text-gray-500 border-gray-200 hover:text-[#2E1650]"
            }`}
            title="Toggle between Visual Editor and raw HTML code"
          >
            {sourceMode ? "Visual Editor" : "HTML"}
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      {sourceMode ? (
        <textarea
          rows={16}
          value={value}
          onChange={(e) => {
            lastExternalValue.current = e.target.value;
            onChange(e.target.value);
          }}
          placeholder="<p>Raw HTML source...</p>"
          className="w-full p-5 font-mono text-xs leading-relaxed text-[#2E1650] focus:outline-none"
        />
      ) : (
        <div className="relative">
          {(!value || value === "<br>" || value === "<p><br></p>") && (
            <div className="pointer-events-none absolute top-5 left-5 right-5 text-sm text-gray-400 select-none">
              Write your article naturally here, or copy and paste directly from Google Docs or Word (all headings, bold text, bullet points, and links will be preserved automatically)...
            </div>
          )}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={syncFromDom}
            onBlur={syncFromDom}
            onPaste={handlePaste}
            className="min-h-[380px] max-h-[680px] overflow-y-auto p-5 sm:p-6 text-[#2E1650] text-base leading-[1.75] focus:outline-none
              [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:mt-6 [&_h1]:mb-3
              [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-2.5
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2
              [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1.5
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1.5
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#D4A017] [&_blockquote]:bg-[#FAF6EC] [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_blockquote]:my-4
              [&_a]:text-[#B88912] [&_a]:underline
              [&_hr]:border-gray-200 [&_hr]:my-6
              [&_img]:rounded-2xl [&_img]:max-h-96 [&_img]:w-auto [&_img]:my-4"
          />
        </div>
      )}

      {/* Footer Info Bar */}
      <div className="bg-gray-50 border-t border-gray-100 px-4 py-2 flex items-center justify-between text-[11px] text-gray-500">
        <span>
          Tip: You can copy &amp; paste formatted articles straight from Google Docs or Microsoft Word.
        </span>
        <span>
          {plainWords} {plainWords === 1 ? "word" : "words"} · ~{readMins} min read
        </span>
      </div>
    </div>
  );
}
