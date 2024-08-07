const ErrorValidation = ({ children }) => {
  return (
    <div className="text-red-500 border border-red-500 bg-red-500/50 font-medium my-3 rounded-md p-2 text-center animate-pulse">
      {children}
    </div>
  );
};

export default ErrorValidation;
