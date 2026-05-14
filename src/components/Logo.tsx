type Props = { className?: string; showMark?: boolean };

/**
 * ANGel logo: the supplied symbol image + the "ANGel" wordmark.
 *
 * The image lives at /public/logo-mark.png (or .svg). It's clipped to a circle
 * with `rounded-full` so any non-black border in the source file disappears
 * against the black page background, and `bg-black` ensures the inside of the
 * circle stays solid black even if the source has transparency.
 */
export function Logo({ className = "", showMark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {showMark && (
        <img
          src="/logo-mark.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="block h-12 w-12 shrink-0 select-none rounded-full object-cover"
        />
      )}
      <span className="font-display text-[26px] leading-none font-semibold tracking-tight">
        <span className="text-angel-orange">AN</span>
        <span className="text-grad-cool">Gel</span>
      </span>
    </span>
  );
}
