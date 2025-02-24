export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col gap-12 items-start p-12'>{children}</div>
  );
}
