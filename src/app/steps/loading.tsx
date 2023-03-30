const StepLoading = () => {
  return (
    <div className="flex h-screen items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
      <div className="flex space-x-2">
        <div className="w-3 h-3 animate-pulse bg-gray-500 rounded-full" />
        <div className="w-3 h-3 animate-pulse [animation-delay:0.5s] bg-gray-500 rounded-full" />
        <div className="w-3 h-3 animate-pulse [animation-delay:1s] bg-gray-500 rounded-full" />
      </div>
    </div>
  );
};

export default StepLoading;
