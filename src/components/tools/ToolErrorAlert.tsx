type ToolErrorAlertProps = {
  message: string;
};

export const ToolErrorAlert = ({ message }: ToolErrorAlertProps) => {
  return (
    <p
      role="alert"
      className="rounded-lg border border-destructive/20 bg-destructive-bg px-3 py-2 text-sm text-destructive"
    >
      {message}
    </p>
  );
};
