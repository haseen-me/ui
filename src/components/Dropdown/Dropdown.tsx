import React, { CSSProperties, useEffect, useRef } from 'react';

import { zIndex, transitions } from '../../tokens';

export const DROPDOWN_CALLER_ID = 'hsn-dropdown-caller';

export interface DropdownProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  anchor?: React.RefObject<HTMLElement | null>;
  width?: number | string;
  maxHeight?: number | string;
  portal?: boolean;
  className?: string;
  style?: CSSProperties;
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  open,
  onClose,
  anchor,
  width,
  maxHeight = 320,
  className,
  style,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        (!anchor?.current || !anchor.current.contains(e.target as Node))
      ) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose, anchor]);

  if (!open) return null;

  const computedStyle: CSSProperties = {
    position: 'absolute',
    zIndex: zIndex.dropdown,
    background: 'var(--hsn-bg-l2-solid)',
    border: '1px solid var(--hsn-border-secondary)',
    borderRadius: '8px',
    boxShadow: 'var(--hsn-shadow-l2)',
    padding: '4px',
    width: typeof width === 'number' ? `${width}px` : width,
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    overflowY: 'auto',
    animation: `hsnDropdownIn ${transitions.normal} ${transitions.easing}`,
    ...style,
  };

  return (
    <div ref={dropdownRef} className={className} style={computedStyle} role="menu">
      {children}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
