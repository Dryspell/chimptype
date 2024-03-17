export function ErrorCount({ count }: { count: number }) {
  return (
    <div
      key={count}
      className="absolute right-8 top-8"
      style={{
        animation: "shake 0.5s ease-in-out 0s 1 normal none running",
      }}
    >
      <div className="flex items-center justify-center">
        <div className="rounded-lg bg-white p-4">
          <p className="text-black">Errors: {count}</p>
        </div>
      </div>
    </div>
  );
}
