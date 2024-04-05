type Props = {
  children: React.ReactNode;
  className?: string;
}

const Container = (props:Props) => {
  const {
    children,
    className
  } = props;

  return (
    <section className={`w-full h-screen bg-white px-12 py-5 ${className}`}>
      {children}
    </section>
  )
}

export default Container