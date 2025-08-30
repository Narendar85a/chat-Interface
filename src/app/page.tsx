export default function Home() {
  return (
    <div className="flex flex-col items-center md:items-start justify-center min-h-[70vh] px-4 sm:px-6 md:px-12 text-center md:text-left">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Welcome Home
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground">
        Select <span className="font-semibold">"Chat"</span> from the sidebar to open the chat window.
      </p>
    </div>
  );
}
