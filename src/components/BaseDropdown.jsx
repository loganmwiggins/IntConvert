import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../stylesheets/ss-components/BaseDropdown.css';

const BASES = [
    { value: 'bin', label: 'Binary', detail: 'base 2' },
    { value: 'oct', label: 'Octal', detail: 'base 8' },
    { value: 'dec', label: 'Decimal', detail: 'base 10' },
    { value: 'hex', label: 'Hexadecimal', detail: 'base 16' },
];

function BaseDropdown({ value, onSelect, exclude }) {
    const [open, setOpen] = useState(false);
    const [highlight, setHighlight] = useState(0);
    const rootRef = useRef(null);

    // Filter out the excluded option
    const items = useMemo(
        () => BASES.filter(b => b.value !== exclude),
        [exclude]
    );

    // Ensure highlight is always in range when items change
    useEffect(() => {
        if (highlight >= items.length) setHighlight(items.length - 1);
    }, [items, highlight]);

    // Close on outside click
    useEffect(() => {
        const onDocClick = (e) => {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    // Keyboard support
    const onKeyDown = (e) => {
        if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setOpen(true);
            return;
        }
        if (!open) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlight((h) => Math.min(h + 1, items.length - 1));
        } 
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlight((h) => Math.max(h - 1, 0));
        }
        else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const chosen = items[highlight];
            if (chosen) {
                onSelect(chosen.value);
                setOpen(false);
            }
        } 
        else if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    const selected = BASES.find(b => b.value === value);
    const buttonLabel = selected ? `${selected.label} (${selected.detail})` : 'Choose…';

    return (
        <div className="bd-root" ref={rootRef}>
            <button
                type="button"
                className={`bd-btn ${open ? 'bd-open' : ''} ${!selected ? 'bd-placeholder' : ''}`}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
                onKeyDown={onKeyDown}
            >
                {buttonLabel}
                <span className="bd-caret" aria-hidden>▾</span>
            </button>

            {open && (
                <ul
                    className="bd-menu"
                    role="listbox"
                    tabIndex={-1}
                    onKeyDown={onKeyDown}
                >
                    {items.map((item, idx) => {
                        const isSelected = value === item.value;
                        const isHighlight = highlight === idx;
                        
                        return (
                            <li
                                key={item.value}
                                role="option"
                                aria-selected={isSelected}
                                className={`bd-item ${isHighlight ? 'bd-item--highlight' : ''} ${isSelected ? 'bd-item--selected' : ''}`}
                                onMouseEnter={() => setHighlight(idx)}
                                onClick={() => { onSelect(item.value); setOpen(false); }}
                            >
                                <span className="bd-item-label">{item.label}</span>
                                <span className="bd-item-detail">{item.detail}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default BaseDropdown;