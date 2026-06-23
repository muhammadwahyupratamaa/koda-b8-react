import AuthBanner from "./AuthBanner";

function AuthLayout({ children, bannerType, center = true }) {
  return (
    <main className="min-h-screen bg-white">
      <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row">
        <section className="h-56 sm:h-72 lg:h-full lg:w-1/2 shrink-0">
          <AuthBanner bannerType={bannerType} />
        </section>

        <section
          className={`relative flex flex-1 justify-center overflow-hidden bg-white ${center ? "items-center" : "items-start lg:items-center"}`}
        >
          <div
            className="absolute -right-52 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-emerald-50 blur-3xl
            "
          />

          <div
            className={`relative z-10 w-full max-w-md px-6 lg:px-10 ${center ? "py-10" : "py-8 lg:py-10"}`}
          >
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AuthLayout;
