type Props = { className?: string; showMark?: boolean };

export function Logo({ className = "", showMark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-4 ${className}`}>
      {showMark && (
        <img
          src="/logo-mark.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="block h-24 w-24 shrink-0 select-none object-contain"
        />
      )}
      <span className="font-display text-[52px] leading-none font-semibold tracking-tight">
        <span className="text-angel-orange">AN</span>
        <span className="text-grad-cool">Gel</span>
      </span>
    </span>
  );
}
