import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from './lib/firebase';
import { Preview } from './components/Preview';
import { Control } from './components/Control';
import { LogOut, Save, User as UserIcon, Palette, Layers, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [color, setColor] = useState('#e0e0e0');
  const [size, setSize] = useState(300);
  const [radius, setRadius] = useState(50);
  const [distance, setDistance] = useState(20);
  const [intensity, setIntensity] = useState(0.15);
  const [blur, setBlur] = useState(60);
  const [shape, setShape] = useState<'flat' | 'concave' | 'convex' | 'pressed'>('flat');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const saveToFirestore = async () => {
    if (!user) {
      setMessage({ text: "Please login to save your design!", type: 'error' });
      return;
    }
    
    setIsSaving(true);
    try {
      await addDoc(collection(db, "designs"), {
        uid: user.uid,
        color,
        size,
        radius,
        distance,
        intensity,
        blur,
        shape,
        createdAt: serverTimestamp()
      });
      setMessage({ text: "Design saved successfully!", type: 'success' });
    } catch (e) {
      console.error("Error saving:", e);
      setMessage({ text: "Failed to save design.", type: 'error' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500" style={{ backgroundColor: color }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Box className="w-6 h-6 text-[#001f3f]" />
            <h1 className="text-xl font-bold text-[#001f3f] tracking-tight">
              Morphix<span className="font-light italic">Studio</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-[#001f3f] uppercase tracking-wider opacity-60">Connected</span>
                  <span className="text-xs font-medium text-[#001f3f]">{user.displayName}</span>
                </div>
                <img 
                  src={user.photoURL || ''} 
                  className="w-9 h-9 rounded-full border-2 border-white shadow-sm" 
                  alt="User" 
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin} 
                className="bg-[#001f3f] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                Login with Google
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-7xl mx-auto w-full px-6 pt-32 pb-12">
        
        {/* Preview Area */}
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <Preview 
            color={color}
            size={size}
            radius={radius}
            distance={distance}
            intensity={intensity}
            blur={blur}
            shape={shape}
          />
        </div>

        {/* Control Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md bg-white/40 backdrop-blur-2xl border border-white/30 rounded-[40px] p-8 shadow-2xl space-y-8"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white/30 p-4 rounded-2xl border border-white/40">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-[#001f3f] opacity-70" />
                <span className="text-sm font-bold text-[#001f3f]">Base Color</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500 uppercase">{color}</span>
                <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  className="w-10 h-10 rounded-xl cursor-pointer border-none shadow-inner bg-transparent" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Control label="Size" val={size} min={50} max={400} set={setSize} />
              <Control label="Radius" val={radius} min={0} max={200} set={setRadius} />
              <Control label="Distance" val={distance} min={0} max={50} set={setDistance} />
              <Control label="Intensity" val={intensity} min={0.01} max={0.6} step={0.01} set={setIntensity} />
              <Control label="Blur" val={blur} min={0} max={100} set={setBlur} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 tracking-wider">
                <Layers className="w-3 h-3" />
                Shape Style
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['flat', 'concave', 'convex', 'pressed'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setShape(s)}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all border ${
                      shape === s 
                        ? 'bg-[#001f3f] text-white border-[#001f3f] shadow-lg' 
                        : 'bg-white/20 text-[#001f3f] border-white/40 hover:bg-white/40'
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={saveToFirestore} 
              disabled={isSaving}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} />
              {isSaving ? 'SAVING...' : 'SAVE DESIGN'}
            </button>
          </div>
        </motion.div>
      </main>

      {/* Notifications */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 ${
              message.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            <span className="text-sm font-bold">{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 px-6 text-center">
        <p className="text-[10px] font-bold text-[#001f3f] uppercase tracking-[0.2em] opacity-30">
          Morphix Studio &copy; 2026 • Neumorphic Design System
        </p>
      </footer>
    </div>
  );
}
