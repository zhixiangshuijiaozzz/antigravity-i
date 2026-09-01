/**
 * @file CodeBlock.tsx
 * @description 笔记代码块 Block 组件，提供代码展示、自适应高度多行编辑与快捷键控制。
 * @module features/notes/components/blocks/CodeBlock
 */

"use client";

import React, { useRef, useEffect } from 'react';
import type { BlockData } from '../../engine/types/block';

interface CodeBlockProps {
  block: BlockData;
  isActive?: boolean;
  onChange: (id: string, newContent: string) => void;
  onEnter?: (id: string) => void;
  onBackspace?: (id: string) => void;
  onFocus?: (id: string) => void;
}

export function CodeBlock({
  block,
  isActive = false,
  onChange,
  onFocus,
  onBackspace,
}: CodeBlockProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isActive && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isActive]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(block.id, e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace' && block.content === '') {
      e.preventDefault();
      onBackspace && onBackspace(block.id);
    }
  };

  return (
    <div
      className={`my-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-100 overflow-hidden ${
        isActive ? 'ring-2 ring-indigo-500/50' : ''
      }`}
      onClick={() => onFocus && onFocus(block.id)}
    >
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-800/80 text-[11px] text-zinc-400 font-mono">
        <span>{block.language || 'Code'}</span>
      </div>
      <textarea
        ref={textareaRef}
        value={block.content || ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => onFocus && onFocus(block.id)}
        placeholder="// 输入代码..."
        rows={Math.max(2, (block.content || '').split('\n').length)}
        className="w-full p-3 font-mono text-xs leading-relaxed bg-transparent outline-none resize-none text-zinc-200"
      />
    </div>
  );
}
