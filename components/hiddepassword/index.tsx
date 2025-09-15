import React, { useMemo, useState } from "react";
import { FaEye, FaEyeSlash, FaRegCopy } from "react-icons/fa";

/**
 * HiddenPasswordLabel
 * A non-input, accessible password display that shows dots (•) when hidden.
 * - TailwindCSS styling
 * - TypeScript
 * - Copy-to-clipboard
 * - Toggle reveal/hide (Eye icon)
 */
export type HiddenPasswordLabelProps = {
  /** The raw password string to represent */
  password: string;
  /** Mask character when hidden (default: •) */
  maskedChar?: string;
  /** Optional additional class names for the container */
  className?: string;
  /** Start revealed initially */
  revealInitially?: boolean;
  /** Show a subtle length indicator at the end, e.g., (12) */
  showLength?: boolean;
  /** ARIA label for the password text */
  ariaLabel?: string;
};

export default function HiddenPasswordLabel({
  password,
  maskedChar = "•",
  className = "",
  revealInitially = false,
  showLength = false,
  ariaLabel = "Password value",
}: HiddenPasswordLabelProps) {
  const [revealed, setRevealed] = useState(revealInitially);
  const [copied, setCopied] = useState(false);

  const masked = useMemo(() => maskedChar.repeat(password?.length || 0), [maskedChar, password]);
  const display = revealed ? password : masked;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      // noop
    }
  };

  return (
    <div
      className={[
        "inline-flex min-w-auto items-center gap-2 rounded-2xl border border-gray-300 px-2",
        className,
      ].join(" ")}
    >
      {/* Label (non-input) */}
      <span
        aria-label={ariaLabel}
        className={[
          "font-mono tracking-wider text-gray-900",
          "select-text",
          "inline-block max-w-full truncate",
        ].join(" ")}
      >
        {display}
        {showLength && (
          <span className="ml-2 text-xs text-gray-500">({password.length})</span>
        )}
      </span>

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          aria-pressed={revealed}
          className={[
            "rounded-xl p-2 transition",
            "hover:bg-gray-100 active:bg-gray-200",
          ].join(" ")}
          title={revealed ? "Sembunyikan" : "Tampilkan"}
        >
          {revealed ? <FaEyeSlash size={18} aria-hidden /> : <FaEye size={18} aria-hidden />}
          <span className="sr-only">{revealed ? "Hide password" : "Show password"}</span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className={[
            "rounded-xl p-2 transition",
            "hover:bg-gray-100 active:bg-gray-200",
          ].join(" ")}
          title={copied ? "Disalin!" : "Salin"}>
          <FaRegCopy size={18} aria-hidden />
          <span className="sr-only">Copy password</span>
        </button>

        {/* Copied pill */}
        <span
          aria-live="polite"
          className={[
            "pointer-events-none select-none text-xs font-medium",
            copied ? "opacity-100" : "opacity-0",
            "transition-opacity text-emerald-600",
          ].join(" ")}
        >
          Disalin
        </span>
      </div>
    </div>
  );
}

