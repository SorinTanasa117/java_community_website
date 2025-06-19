import logo from "/src/images/logo.svg";

export default function AnimatedLogo() {
  return (
    <div className="mb-3 flex justify-center">
      <div className="relative">
          <div className="w-48 h-48 rounded-full flex items-center justify-center animate-spin-slow">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center">
              <object data={logo} type="image/svg+xml" className="w-64 h-64"></object>
            </div>
          </div>
        <div className="absolute inset-0 w-48 h-48 border-2 border-accent rounded-full animate-pulse" style={{ borderWidth: '1px', borderStyle: 'solid' }}></div>
    </div>
  </div>
  );
}
