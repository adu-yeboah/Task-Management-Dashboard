import { useEffect } from 'react';
import { useLoginMutation } from '@/hooks/useLogin';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must be at most 50 characters" })
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-4 sm:p-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-md xl:max-w-md space-y-6 sm:space-y-8 p-6 sm:p-8 md:p-10 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Logo/Brand */}
        <div className="flex justify-center">
          <span className="text-xl sm:text-2xl font-bold bg-indigo-600 text-center text-white px-4 py-2 rounded">
            TMD
          </span>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Sign in
          </h2>
        </div>

        {/* Form */}
        <form className="mt-4 sm:mt-6 space-y-4 sm:space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3 sm:space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                id="username"
                {...register('username')}
                type="text"
                autoComplete="username"
                className={`mt-1 appearance-none block w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm sm:text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:text-white ${errors.username ? 'border-red-500' : ''}`}
                placeholder="yourusername"
              />
              {errors.username && (
                <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-300">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                {...register('password')}
                type="password"
                autoComplete="current-password"
                className={`mt-1 appearance-none block w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm sm:text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:text-white ${errors.password ? 'border-red-500' : ''}`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-300">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loginMutation.isPending ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {/* Error Message */}
          {loginMutation.isError && (
            <div className="rounded-md p-3 sm:p-4 bg-red-50 dark:bg-red-900 dark:bg-opacity-20">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-2 sm:ml-3">
                  <h3 className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-300">Login failed</h3>
                  <div className="mt-1 text-xs sm:text-sm text-red-700 dark:text-red-200">
                    <p>Invalid username or password. Please try again.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;