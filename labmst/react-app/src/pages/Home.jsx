import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to App
        </h1>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Link
          to="/counter"
          className="block p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-indigo-600">Counter</h2>
          <p className="text-gray-600 mt-2">
            Try out the counter page and play with state updates.
          </p>
        </Link>

        <Link
          to="/form"
          className="block p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-indigo-600">Form Page</h2>
          <p className="text-gray-600 mt-2">
            Fill out a simple form and experience controlled components.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
