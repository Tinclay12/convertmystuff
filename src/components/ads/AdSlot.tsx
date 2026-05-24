type AdSlotProps = {
  placement: "tool-sidebar" | "below-tool" | "in-content";
};

export const AdSlot = ({ placement }: AdSlotProps) => {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="mt-6 rounded-2xl border border-dashed border-border bg-background-subtle px-4 py-6 text-center text-xs uppercase tracking-wide text-muted/60"
      data-ad-placement={placement}
    >
      Ad slot · {placement}
    </div>
  );
};
