import React, { CSSProperties, forwardRef } from 'react';

import { radii, zIndex } from '../../tokens';

// ─── Class Constants ────────────────────────────────────────────────────────────

export const SURFACE_CLASSNAME = 'hsn-surface';
export const MODAL_CLASSNAME = 'hsn-modal';
export const DRAWER_CLASSNAME = 'hsn-drawer';
export const DROPDOWN_CALLER_CLASSNAME = 'hsn-dropdown-caller';
export const SCRIM_CLASSNAME = 'hsn-scrim';
export const ENABLE_OUTSIDE_CLICKS_CLASSNAME = 'hsn-enable-outside-clicks';
export const MODAL_AND_DROPDOWN_SELECTOR = `.${MODAL_CLASSNAME}, .${DROPDOWN_CALLER_CLASSNAME}`;

// ─── Types ──────────────────────────────────────────────────────────────────────

export type SurfaceLevel = 'l0' | 'l1' | 'l2' | 'l3';
export type SurfaceVariant = 'solid' | 'glass';

export interface SurfaceProps {
  children: React.ReactNode;
  level?: SurfaceLevel;
  variant?: SurfaceVariant;
  rounded?: boolean;
  shadow?: boolean;
  padding?: string | number;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  id?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────────

const SHADOW_MAP: Record<number, string> = {
  0: 'var(--hsn-shadow-l1)',
  1: 'var(--hsn-shadow-l1)',
  2: 'var(--hsn-shadow-l2)',
  3: 'var(--hsn-shadow-l3)',
};

const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  (
    {
      children,
      level = 'l2',
      variant = 'solid',
      rounded = true,
      shadow = true,
      padding,
      className,
      style,
      onClick,
      id,
    },
    ref
  ) => {
    const levelNum = parseInt(level[1]);
    const bgVar = `var(--hsn-bg-${level}-${variant})`;
    const shadowValue = shadow ? SHADOW_MAP[levelNum] : undefined;

    const computedStyle: CSSProperties = {
      background: bgVar,
      borderRadius: rounded ? radii.xl : undefined,
      border: '1px solid var(--hsn-border-secondary)',
      backdropFilter: variant === 'glass' ? 'blur(14px) saturate(125%)' : undefined,
      boxShadow: shadowValue,
      padding: typeof padding === 'number' ? `${padding}px` : padding,
      position: 'relative',
      overflow: 'hidden',
      zIndex: zIndex.base,
      ...style,
    };

    return (
      <div
        ref={ref}
        id={id}
        className={`${SURFACE_CLASSNAME}${className ? ` ${className}` : ''}`}
        style={computedStyle}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);

Surface.displayName = 'Surface';

export default Surface;
