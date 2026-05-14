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
        <span
          aria-hidden="true"
          className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-black"
        >
          <img
            src="/logo-mark.png"
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </span>
      )}
      <span className="font-display text-[22px] font-semibold tracking-tight">
        <span className="text-angel-orange">AN</span>
        <span className="text-grad-cool">Gel</span>
      </span>
    </span>
  );
}
