interface Props {
  variant: "primary" | "secondary";
}

export default function Button({ variant }: Props) {
  return (
    <button
      className={`py-2 px-4 border ${
        variant === "primary" ? "bg-blue-500 text-white" : "bg-white"
      }`}
    >
      {variant === "primary" ? "Primary button" : "Secondary button"}
    </button>
  );
}
