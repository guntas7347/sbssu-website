"use client";

import { useState, useEffect, useRef } from "react";
import { GraduationCap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAdmin } from "../AdminContext";

export default function OtpPage() {
  const { setUser } = useAdmin();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const loginToken = searchParams.get("login"); // short-lived JWT from login response

  useEffect(() => {
    if (!loginToken || loginToken.length < 80) {
      router.replace("/admin/login");
    }
  }, [loginToken, router]);

  // countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasted)) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const code = otp.join("");
    if (code.length !== 6) {
      setError("Enter the 6-digit code");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: code, tempToken: loginToken }),
      });

      if (!res.ok) throw new Error("OTP verification failed");

      const json = await res.json();

      const portals = json.portals || [];

      // store user in context
      setUser(json.user);

      // route logic
      if (portals.length > 10) {
        // > 10 will always be false
        router.push("/admin/portal-selection");
      } else if (portals.includes("admin")) {
        router.push("/admin/admin/dashboard");
      } else if (portals.includes("central")) {
        router.push("/admin/central/dashboard");
      } else if (portals.includes("department")) {
        router.push("/admin/department/dashboard");
      } else if (portals.includes("placement")) {
        router.push("/admin/placement/dashboard");
      } else {
        router.push("/admin/login");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(120);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    // optional: trigger resend OTP API here if needed
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-500 via-orange-600 to-green-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-linear-to-r from-orange-600 to-orange-500 p-8 text-center">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Verify OTP</h1>
          <p className="text-orange-100 text-sm">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              ))}
            </div>

            {error && (
              <p className="text-red-600 text-center text-sm font-medium">
                {error}
              </p>
            )}

            <div className="text-center">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-50 rounded-lg">
                <span className="text-sm text-gray-600">Time remaining:</span>
                <span
                  className={`text-lg font-bold ${
                    timeLeft < 30 ? "text-red-600" : "text-orange-600"
                  }`}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-orange-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center">
              {timeLeft === 0 ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-sm text-gray-600">
                  Didn&apos;t receive the code?{" "}
                  <span className="text-gray-400 cursor-not-allowed">
                    Resend OTP
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
