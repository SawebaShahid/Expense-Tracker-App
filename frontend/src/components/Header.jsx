function Header() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-gray-800">
          Welcome 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Track your income and expenses easily.
        </p>

      </div>

      <div className="bg-white shadow rounded-xl px-5 py-3">

        <p className="text-gray-500 text-sm">
          Today
        </p>

        <h3 className="font-semibold">
          {today}
        </h3>

      </div>

    </div>
  );
}

export default Header;