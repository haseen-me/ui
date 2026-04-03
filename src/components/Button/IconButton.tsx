import React, { CSSProperties, forwardRef } from 'react';

import { sizeHeight, transitions } from '../../tokens';
import { ThemeMode } from '../../theme/ThemeProvider';
import { getThemedColor } from '../../utils/colorUtils';
import { Size, Type } from '../../types';

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: Type;
  size?: Size.SMALL | Size.MEDIUM | Size.LARGE;
  disabled?: boolean;
  tooltip?: string;
  forceTheme?: ThemeMode;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────────

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      onClick,
      type = Type.TERTIARY,
      size = Size.MEDIUM,
      disabled = false,
      tooltip,
      forceTheme,
      className,
      style,
      dataTestId,
    },
    ref
  ) => {
    const dim = sizeHeight[size as keyof typeof sizeHeight] ?? sizeHeight.medium;

    const v = (cssVar: string) => getThemedColor(`var(${cssVar})`, forceTheme);

    const bgMap: Record<Type, string> = {
      [Type.PRIMARY]: v('--hsn-cta-primary-default'),
      [Type.SECONDARY]: v('--hsn-cta-secondary-default'),
      [Type.TERTIARY]: v('--hsn-cta-tertiary-default'),
      [Type.DESTRUCTIVE]: v('--hsn-cta-destructive-default'),
    };

    const colorMap: Record<Type, string> = {
      [Type.PRIMARY]: v('--hsn-text-always-white'),
      [Type.SECONDARY]: v('--hsn-icon-primary'),
      [Type.TERTIARY]: v('--hsn-icon-secondary'),
      [Type.DESTRUCTIVE]: v('--hsn-icon-destructive'),
    };

    const computedStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${dim}px`,
      height: `${dim}px`,
      borderRadius: '8px',
      background: disabled ? 'transparent' : bgMap[type],
      color: disabled ? v('--hsn-icon-disabled') : colorMap[type],
      border: type === Type.SECONDARY ? `1px solid ${v('--hsn-border-secondary')}` : 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: `all ${transitions.normal} ${transitions.easing}`,
      outline: 'none',
      padding: 0,
      flexShrink: 0,
      ...style,
    };

    return (
      <button
        ref={ref}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={className}
        style={computedStyle}
        data-testid={dataTestId}
        title={tooltip}
        aria-label={tooltip}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
