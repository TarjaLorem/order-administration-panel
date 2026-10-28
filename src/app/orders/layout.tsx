export default function OrdersLayout({ children, modal }: LayoutProps<"/orders">) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
