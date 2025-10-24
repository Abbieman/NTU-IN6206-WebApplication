import {
  AlertCircle,
  Bus,
  Car,
  CheckCircle2,
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  Train,
  User,
} from "lucide-react";
import React, { useState } from "react";

interface LoginForm {
  username: string;
  password: string;
}

interface RegisterForm {
  username: string;
  password: string;
  telephone: string;
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    username: "",
    password: "",
    telephone: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateLogin = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loginForm.username.trim()) {
      newErrors.username = "Please enter your username";
    }

    if (!loginForm.password) {
      newErrors.password = "Please enter your password";
    } else if (loginForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = (): boolean => {
    const newErrors: FormErrors = {};

    if (!registerForm.username.trim()) {
      newErrors.username = "Please enter a username";
    }

    if (!registerForm.password) {
      newErrors.password = "Please enter a password";
    }

    if (!registerForm.telephone.trim()) {
      newErrors.telephone = "Please enter your phone number";
    } else if (!/^[0-9]{8,11}$/.test(registerForm.telephone)) {
      newErrors.telephone = "Please enter a valid phone number";
    }

    if (!registerForm.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLogin()) return;

    setIsLoading(true);
    setSuccessMessage("");

    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Login successful!");
      console.log("Login:", loginForm);

      // Example: Navigate to dashboard
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegister()) return;

    setIsLoading(true);
    setSuccessMessage("");

    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Registration successful! Please log in.");
      console.log("Register:", registerForm);

      // Switch to login screen
      setTimeout(() => {
        setIsLogin(true);
        setSuccessMessage("");
        setRegisterForm({
          username: "",
          password: "",
          telephone: "",
          email: "",
        });
      }, 2000);
    }, 1500);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setSuccessMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mt-48"></div>
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-white opacity-5 rounded-full -mb-40"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        {isLogin && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-2xl mb-4">
              <CreditCard className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome!</h1>
            <div className="flex justify-center gap-4 mt-4">
              <Bus className="w-6 h-6 text-white opacity-60" />
              <Train className="w-6 h-6 text-white opacity-60" />
              <Car className="w-6 h-6 text-white opacity-60" />
            </div>
          </div>
        )}

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Tab Switcher */}
          <div className="flex bg-gray-50">
            <button
              onClick={switchMode}
              disabled={isLogin}
              className={`flex-1 py-4 font-bold text-lg transition ${
                isLogin
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={switchMode}
              disabled={!isLogin}
              className={`flex-1 py-4 font-bold text-lg transition ${
                !isLogin
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
          </div>

          <div className="p-8">
            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-700 font-medium">{successMessage}</p>
              </div>
            )}

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={loginForm.username}
                      onChange={(e) => {
                        setLoginForm({
                          ...loginForm,
                          username: e.target.value,
                        });
                        if (errors.username)
                          setErrors({ ...errors, username: "" });
                      }}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                        errors.username
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      placeholder="Enter your username"
                    />
                  </div>
                  {errors.username && (
                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.username}</span>
                    </div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => {
                        setLoginForm({
                          ...loginForm,
                          password: e.target.value,
                        });
                        if (errors.password)
                          setErrors({ ...errors, password: "" });
                      }}
                      className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition ${
                        errors.password
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegister} className="space-y-5">
                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={registerForm.username}
                      onChange={(e) => {
                        setRegisterForm({
                          ...registerForm,
                          username: e.target.value,
                        });
                        if (errors.username)
                          setErrors({ ...errors, username: "" });
                      }}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                        errors.username
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      placeholder="Enter username (min. 3 characters)"
                    />
                  </div>
                  {errors.username && (
                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.username}</span>
                    </div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerForm.password}
                      onChange={(e) => {
                        setRegisterForm({
                          ...registerForm,
                          password: e.target.value,
                        });
                        if (errors.password)
                          setErrors({ ...errors, password: "" });
                      }}
                      className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition ${
                        errors.password
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      placeholder="Enter password (6+ chars, with letters & numbers)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                {/* Telephone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={registerForm.telephone}
                      onChange={(e) => {
                        setRegisterForm({
                          ...registerForm,
                          telephone: e.target.value,
                        });
                        if (errors.telephone)
                          setErrors({ ...errors, telephone: "" });
                      }}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                        errors.telephone
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.telephone && (
                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.telephone}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => {
                        setRegisterForm({
                          ...registerForm,
                          email: e.target.value,
                        });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                        errors.email
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I have read and agree to the{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      User Agreement
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Registering...
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
