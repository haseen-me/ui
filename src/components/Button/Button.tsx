import React, { CSSProperties, forwardRef } from 'react';

import { sizeHeight, transitions } from '../../tokens';
import { ThemeMode } from '../../theme/ThemeProvider';
import { getThemedColor } from '../../utils/colorUtils';
import { Size, Type } from '../../types';

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: Type;
  size?: Size.SMALL | Size.MEDIUM | Size.LARGE;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  forceTheme?: ThemeMode;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
}

// ─── Style Resolution ───────────────────────────────────────────────────────────

function getButtonStyles(
  btnType: Type,
  disabled: boolean,
  forceTheme?: ThemeMode
): { background: string; color: string; border: string; shadow: string } {
  const v = (cssVar: string) => getThemedColor(`var(${cssVar})`, forceTheme);

  if (disabled) {
    return {
      background: v('--hsn-cta-primary-disabled'),
      color: v('--hsn-text-disabled'),
      border: 'none',
      shadow: 'none',
    };
  }

  switch (btnType) {
    case Type.PRIMARY:
      return {
        background: v('--hsn-cta-primary-default'),
        color: v('--hsn-text-always-white'),
        border: 'none',
        shadow: 'none',
      };
    case Type.SECONDARY:
      return {
        background: v('--hsn-cta-secondary-default'),
        color: v('--hsn-text-primary'),
        border: `1px solid ${v('--hsn-border-secondary')}`,
        shadow: v('--hsn-shadow-secondary-button'),
      };
    case Type.TERTIARY:
      return {
        background: v('--hsn-cta-tertiary-default'),
        color: v('--hsn-text-secondary'),
        border: 'none',
        shadow: 'none',
      };
    case Type.DESTRUCTIVE:
      return {
        background: v('--hsn-cta-destructive-default'),
        color: v('--hsn-text-destructive'),
        border: `1px solid ${v('--hsn-border-destructive')}`,
        shadow: v('--hsn-shadow-destructive-button'),
      };
  }
}

const FONT_SIZE_MAP: Record<string, string> = {
  [Size.SMALL]: '0.75rem',
  [Size.MEDIUM]: '0.8125rem',
  [Size.LARGE]: '0.875rem',
};

// ─── Component ──────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      type = Type.PRIMARY,
      size = Size.MEDIUM,
      fullWidth = false,
      disabled = false,
      loading = false,
      startIcon,
      endIcon,
      forceTheme,
      className,
      style,
      dataTestId,
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const styleSet = getButtonStyles(type, isDisabled, forceTheme);
    const height = sizeHeight[size as keyof typeof sizeHeight] ?? sizeHeight.medium;

    const computedStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      height: `${height}px`,
      padding: '0 16px',
      fontSize: FONT_SIZE_MAP[size] ?? '0.8125rem',
      fontWeight: 500,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      lineHeight: '1',
      borderRadius: '8px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,
      transition: `all ${transitions.normal} ${transitions.easing}`,
      width: fullWidth ? '100%' : undefined,
      background: styleSet.background,
      color: styleSet.color,
      border: styleSet.border,
      boxShadow: styleSet.shadow !== 'none' ? styleSet.shadow : undefined,
      outline: 'none',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      ...style,
    };

    return (
      <button
        ref={ref}
        onClick={isDisabled ? undefined : onClick}
        disabled={isDisabled}
        className={className}
        style={computedStyle}
        data-testid={dataTestId}
      >
        {startIcon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{startIcon}</span>}
        {children}
        {endIcon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
