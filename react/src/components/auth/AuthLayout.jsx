import AuthBanner from "./AuthBanner";

function AuthLayout({ children, bannerType }) {
  return (
    <main className="min-h-screen flex">
      <AuthBanner bannerType={bannerType} />

      <section className="w-1/2 flex bg-gray-100 items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}

export default AuthLayout;
