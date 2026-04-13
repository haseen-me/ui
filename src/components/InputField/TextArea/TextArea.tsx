import React, { CSSProperties, forwardRef } from 'react';

import { FONT_FAMILY_SANS } from '../../../constants';
import { transitions } from '../../../tokens';

export interface TextAreaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  rows?: number;
  maxLength?: number;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      value,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      placeholder,
      disabled = false,
      readOnly = false,
      error = false,
      rows = 3,
      maxLength,
      autoFocus,
      name,
      id,
      className,
      style,
      dataTestId,
    },
    ref
  ) => {
    const wrapperStyle: CSSProperties = {
      display: 'flex',
      padding: '8px 12px',
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

    const textAreaStyle: CSSProperties = {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: '0.8125rem',
      fontFamily: FONT_FAMILY_SANS,
      fontWeight: 400,
      color: 'var(--hsn-text-primary)',
      resize: 'vertical',
      padding: 0,
      width: '100%',
      lineHeight: '1.5',
    };

    return (
      <div className={className} style={wrapperStyle}>
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          maxLength={maxLength}
          autoFocus={autoFocus}
          name={name}
          id={id}
          style={textAreaStyle}
          data-testid={dataTestId}
        />
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
