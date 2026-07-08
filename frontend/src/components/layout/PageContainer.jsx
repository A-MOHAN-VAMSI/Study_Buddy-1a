export default function PageContainer({ children }) {
  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}