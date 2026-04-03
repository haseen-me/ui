import React, { CSSProperties, useEffect } from 'react';

import { zIndex, transitions } from '../../tokens';

export enum DialogType {
  DEFAULT = 'default',
  CONFIRM = 'confirm',
  DESTRUCTIVE = 'destructive',
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  type?: DialogType;
  width?: number | string;
  actions?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  type: _type = DialogType.DEFAULT,
  width = 420,
  actions,
  className,
  style,
}) => {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const scrimStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: zIndex.modal,
    background: 'var(--hsn-bg-scrim)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: `hsnFadeIn ${transitions.normal} ${transitions.easing}`,
  };

  const dialogStyle: CSSProperties = {
    background: 'var(--hsn-bg-l2-solid)',
    border: '1px solid var(--hsn-border-secondary)',
    borderRadius: '12px',
    boxShadow: 'var(--hsn-shadow-l3)',
    width: typeof width === 'number' ? `${width}px` : width,
    maxWidth: 'calc(100vw - 48px)',
    maxHeight: 'calc(100vh - 48px)',
    overflow: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    ...style,
  };

  const titleStyle: CSSProperties = {
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: 'var(--hsn-text-primary)',
    margin: 0,
    lineHeight: '1.4',
  };

  const descStyle: CSSProperties = {
    fontSize: '0.8125rem',
    fontWeight: 400,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: 'var(--hsn-text-secondary)',
    margin: 0,
    lineHeight: '1.5',
  };

  const actionsStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '8px',
  };

  return (
    <div style={scrimStyle} onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={className}
        style={dialogStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 style={titleStyle}>{title}</h2>}
        {description && <p style={descStyle}>{description}</p>}
        {children}
        {actions && <div style={actionsStyle}>{actions}</div>}
      </div>
    </div>
  );
};

Dialog.displayName = 'Dialog';

export { DialogType as DialogTypes };
export default Dialog;
