import React, { useState, FormEvent } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
  onSignup: (email: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (isLoginView) {
      if (!email || !password) {
        setError('Vui lòng nhập email và mật khẩu.');
        return;
      }
      onLogin(email);
    } else {
      if (!email || !password || !confirmPassword) {
        setError('Vui lòng điền đầy đủ thông tin.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Mật khẩu không khớp.');
        return;
      }
      onSignup(email);
    }
  };

  const switchView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-75 transition-opacity animate-fade-in"
      aria-labelledby="auth-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="relative bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-lg shadow-xl p-8 w-full max-w-md m-4 transform transition-all animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="auth-modal-title" className="text-2xl font-bold text-white">
            {isLoginView ? 'Đăng nhập' : 'Tạo tài khoản'}
          </h2>
          <button type="button" className="-m-2 p-2 text-slate-400 hover:text-white transition-transform transform hover:scale-110" onClick={onClose}>
            <span className="sr-only">Đóng</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
              Địa chỉ email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
              Mật khẩu
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLoginView ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
          </div>
          
          {!isLoginView && (
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300">
                Xác nhận mật khẩu
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-3 py-2 bg-slate-700/80 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all transform hover:scale-105"
            >
              {isLoginView ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <button onClick={switchView} className="font-medium text-cyan-500 hover:text-cyan-400 transition-transform transform hover:scale-105">
            {isLoginView ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;