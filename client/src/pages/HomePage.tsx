import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="mx-auto flex flex-col max-w-sm items-center gap-3 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <h1 className="text-xl font-medium text-white mb-4">
        Welcome to Antibiotics for Dummies
      </h1>
      <p>Your go-to resource for understanding antibiotics and bacteria.</p>
      <p>
        Use the navigation to explore antibiotics and bacteria, or use the
        search function to find specific information.
      </p>
    </div>
  );
};

export default HomePage;
