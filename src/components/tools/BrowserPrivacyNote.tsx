type BrowserPrivacyNoteProps = {
  className?: string;
};

export const BrowserPrivacyNote = ({ className }: BrowserPrivacyNoteProps) => {
  return (
    <p className={`text-sm text-muted ${className ?? ""}`}>
      Runs in your browser. Your files and data are not uploaded to a server.
    </p>
  );
};
