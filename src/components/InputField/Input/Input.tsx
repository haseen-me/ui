import React, { CSSProperties, forwardRef } from 'react';

import { sizeHeight, transitions } from '../../../tokens';
import { Size } from '../../../types';

// ─── Types ──────────────────────────────────────────────────────────────────────

export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  NUMBER = 'number',
  SEARCH = 'search',
  URL = 'url',
  TEL = 'tel',
}

export enum InputFieldSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: InputType;
  size?: InputFieldSize;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  autoFocus?: boolean;
  autoComplete?: string;
  maxLength?: number;
  name?: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────────

const FONT_SIZE_MAP: Record<InputFieldSize, string> = {
  [InputFieldSize.SMALL]: '0.75rem',
  [InputFieldSize.MEDIUM]: '0.8125rem',
  [InputFieldSize.LARGE]: '0.875rem',
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      placeholder,
      type = InputType.TEXT,
      size = InputFieldSize.MEDIUM,
      disabled = false,
      readOnly = false,
      error = false,
      startIcon,
      endIcon,
      autoFocus,
      autoComplete,
      maxLength,
      name,
      id,
      className,
      style,
      dataTestId,
    },
    ref
  ) => {
    const height = sizeHeight[size as keyof typeof sizeHeight] ?? sizeHeight[Size.MEDIUM as keyof typeof sizeHeight];

    const wrapperStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      height: `${height}px`,
      padding: '0 12px',
      borderRadius: '8px',
      background: error ? 'var(--hsn-bg-overlay-destructive)' : 'var(--hsn-bg-field-default)',
      border: error
        ? '1px solid var(--hsn-border-destructive)'
        : '1px solid var(--hsn-border-secondary)',
      transition: `all ${transitions.normal} ${transitions.easing}`,
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.6 : 1,
      width: '100%',
      ...style,
    };

    const inputStyle: CSSProperties = {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: FONT_SIZE_MAP[size],
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeight: 400,
      color: 'var(--hsn-text-primary)',
      padding: 0,
      width: '100%',
      height: '100%',
    };

    const iconStyle: CSSProperties = {
      display: 'inline-flex',
      flexShrink: 0,
      color: 'var(--hsn-icon-tertiary)',
    };

    return (
      <div className={className} style={wrapperStyle}>
        {startIcon && <span style={iconStyle}>{startIcon}</span>}
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          maxLength={maxLength}
          name={name}
          id={id}
          style={inputStyle}
          data-testid={dataTestId}
        />
        {endIcon && <span style={iconStyle}>{endIcon}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
