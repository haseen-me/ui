import React, { CSSProperties, useRef, useState } from 'react';

import { FONT_FAMILY_SANS } from '../../constants';
import { transitions } from '../../tokens';

export interface SelectOption<T = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps<T = string> {
  options: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
}

function Select<T = string>({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  width,
  className,
  style,
  dataTestId,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  const triggerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    height: '36px',
    padding: '0 12px',
    borderRadius: '8px',
    background: 'var(--hsn-bg-field-default)',
    border: '1px solid var(--hsn-border-secondary)',
    fontSize: '0.8125rem',
    fontFamily: FONT_FAMILY_SANS,
    color: selected ? 'var(--hsn-text-primary)' : 'var(--hsn-text-tertiary)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: `all ${transitions.normal} ${transitions.easing}`,
    width: typeof width === 'number' ? `${width}px` : width ?? '100%',
    outline: 'none',
    userSelect: 'none',
    textAlign: 'left',
    ...style,
  };

  const dropdownStyle: CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '4px',
    background: 'var(--hsn-bg-l2-solid)',
    border: '1px solid var(--hsn-border-secondary)',
    borderRadius: '8px',
    boxShadow: 'var(--hsn-shadow-l2)',
    padding: '4px',
    zIndex: 1,
    maxHeight: '240px',
    overflowY: 'auto',
  };

  const itemStyle = (isSelected: boolean, isDisabled: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 8px',
    borderRadius: '6px',
    fontSize: '0.8125rem',
    fontFamily: FONT_FAMILY_SANS,
    color: isDisabled ? 'var(--hsn-text-disabled)' : 'var(--hsn-text-primary)',
    background: isSelected ? 'var(--hsn-bg-cell-active)' : 'transparent',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
    width: '100%',
    textAlign: 'left',
    transition: `background ${transitions.fast} ${transitions.easing}`,
  });

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block', width: typeof width === 'number' ? `${width}px` : width ?? '100%' }}
      data-testid={dataTestId}
    >
      <button
        style={triggerStyle}
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected?.icon && (
          <span style={{ display: 'inline-flex', flexShrink: 0 }}>{selected.icon}</span>
        )}
        <span style={{ flex: 1 }}>{selected?.label ?? placeholder}</span>
        <span
          style={{
            display: 'inline-flex',
            color: 'var(--hsn-icon-tertiary)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: `transform ${transitions.fast} ${transitions.easing}`,
            fontSize: '12px',
          }}
        >
          ▾
        </span>
      </button>
      {open && (
        <div style={dropdownStyle} role="listbox">
          {options.map((opt) => (
            <button
              key={String(opt.value)}
              style={itemStyle(opt.value === value, !!opt.disabled)}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                if (!opt.disabled) {
                  onChange?.(opt.value);
                  setOpen(false);
                }
              }}
            >
              {opt.icon && (
                <span style={{ display: 'inline-flex', flexShrink: 0 }}>{opt.icon}</span>
              )}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

Select.displayName = 'Select';

export default Select;
