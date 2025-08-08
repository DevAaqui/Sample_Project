"use client";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <main className={`mx-auto pt-8 mr-0 ml-0  w-[100%]`}>{children}</main>
    </div>
  );
}
